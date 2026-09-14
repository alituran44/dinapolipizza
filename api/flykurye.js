export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (parseErr) {
        return res.status(400).json({ success: false, error: 'Invalid JSON body' });
      }
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ success: false, error: 'Empty or invalid request payload' });
    }

    const {
      orderId,
      customerName,
      customerPhone,
      address,
      addressDetail,
      orderNote,
      paymentMethod,
      total,
      items,
      branch,
      deliveryMode
    } = body;

    // Gel-al (pickup) siparişlerinde kurye çağrılmaz
    if (deliveryMode === 'pickup') {
      return res.status(200).json({
        success: true,
        isPickup: true,
        message: 'Gel-Al (şubeden teslim) siparişi olduğu için Fly Kurye çağrısı yapılmadı.'
      });
    }

    // Ödeme yöntemi eşleştirmesi (Ahtapot / Fly Kurye standartları)
    // cash -> Nakit, creditCard -> Kredi Kartı, foodCard -> Kapıda Yemek Kartı, onlineFoodCard -> Online Yemek Kartı, online -> Online, free -> Ücretsiz
    let mappedPayment = 'cash';
    const cleanPayment = String(paymentMethod || '').toLowerCase();
    if (cleanPayment.includes('kart') || cleanPayment.includes('card') || cleanPayment.includes('pos')) {
      mappedPayment = 'creditCard';
    } else if (cleanPayment.includes('online')) {
      mappedPayment = 'online';
    } else if (cleanPayment.includes('yemek') || cleanPayment.includes('sodexo') || cleanPayment.includes('multinet') || cleanPayment.includes('food')) {
      mappedPayment = 'foodCard';
    } else if (cleanPayment.includes('free') || cleanPayment.includes('ucretsiz')) {
      mappedPayment = 'free';
    }

    // Ürün listesini formatla
    let formattedItems = [];
    if (Array.isArray(items) && items.length > 0) {
      formattedItems = items.map(item => {
        if (typeof item === 'string') {
          return { name: item, qty: 1, price: 0 };
        }
        return {
          name: item.name || item.title || 'Pizza',
          qty: Number(item.quantity || item.qty || 1),
          price: Number(item.price || 0)
        };
      });
    } else {
      formattedItems = [
        {
          name: 'Di Napoli Pizza Siparişi',
          qty: 1,
          price: Number(total || 0)
        }
      ];
    }

    const isHamidiye = (branch && branch.toLowerCase().includes('hamidiye')) || 
                      (address && (address.toLowerCase().includes('kepez') || address.toLowerCase().includes('hamidiye')));

    // Ahtapot Yazılım ve Teknoloji (Fly Kurye / Ropaket) resmi JSON şeması
    const flyPayload = {
      customer_info: {
        customer_id: customerPhone ? customerPhone.replace(/\D/g, '') : '123',
        full_name: customerName || 'Di Napoli Müşterisi',
        phone_number: customerPhone || '05057261717'
      },
      address_info: {
        main_address: address || 'Kemalpaşa Mah. Saat Kulesi Karşısı Çanakkale',
        address_detail: addressDetail || (isHamidiye ? 'Kepez Şube Bölgesi' : 'Merkez Şube Bölgesi'),
        location: {
          latitude: isHamidiye ? 40.1037 : 40.1553,
          longitude: isHamidiye ? 26.4082 : 26.4067
        }
      },
      order_details: {
        order_note: orderNote || (isHamidiye ? 'Hamidiye Şube Siparişi' : 'Saat Kulesi Şube Siparişi'),
        payment_amount: Number(total || 0),
        payment_method: mappedPayment,
        items: formattedItems
      },
      restaurant_info: {
        restaurant_id: '6a0daa66b0ce0f22c4e5b3aa',
        bayilik_id: '6a0c5081b0ce0f22c4e5a568'
      },
      system_info: {
        created_by: 'admin',
        order_source: 'dashboard',
        original_order_id: String(orderId || `DN-${Date.now()}`)
      }
    };

    // Öncelikli olarak çalışan canlı Ropaket HTTPS API'si, yedek olarak maildeki flykurye.com denenir
    const candidateEndpoints = [
      'https://ropaket.com/api/createOrderv2',
      'http://flykurye.com/api/createOrderv2'
    ];

    let lastError = null;
    for (const endpoint of candidateEndpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(flyPayload)
        });

        const resText = await response.text();
        let resJson = null;
        try {
          resJson = JSON.parse(resText);
        } catch (e) {
          resJson = { rawText: resText };
        }

        if (response.ok && (!resJson || resJson.success !== false)) {
          return res.status(200).json({
            success: true,
            provider: 'Fly Kurye / Ropaket',
            endpointUsed: endpoint,
            data: resJson
          });
        } else {
          lastError = { status: response.status, endpoint, response: resJson };
        }
      } catch (fetchErr) {
        lastError = { endpoint, error: fetchErr.message };
      }
    }

    return res.status(502).json({
      success: false,
      error: 'Fly Kurye servisine iletilemedi.',
      debug: lastError
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Sunucu tarafında beklenmeyen hata: ' + err.message
    });
  }
}
