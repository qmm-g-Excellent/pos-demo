'use strict';

describe('pos', () => {
  let inputs;

  it('buildCartItem():build cartItems and count number', () => {
    inputs = [
      'ITEM000001-1',
      'ITEM000001-2',
      'ITEM000003-2'
    ];
    var cartItems = buildCartItems(inputs, loadAllItems());
    const expectCartItems = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 3
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      }
    ];
    expect(cartItems).toEqual(expectCartItems);
  });

  it("build Subtotal and save", () => {
    let cartItems = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 3
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      }
    ];
    let receiptItems = buildReceiptItems(cartItems, loadPromotions());
    const expectReceiptItem = [
      {
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 3
        },
        subtotal: 6.00,
        saved: 3.00
      },

      {
        cartItem: {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        subtotal: 30.00,
        saved: 0
      }
    ];
    expect(receiptItems).toEqual(expectReceiptItem);
  });

  it("build receipt and count saveTotal", () => {
    // let receiptItems = buildReceiptItems()
    let receiptItems = [
      {
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 3
        },
        subtotal: 6.00,
        saved: 3.00
      },

      {
        cartItem: {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        subtotal: 30.00,
        saved: 0
      }
    ];
    let receipt = buildReceipt(receiptItems);
    const expectReceipt = {
      receiptItems: [
        {
          cartItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 3
          },
          subtotal: 6.00,
          saved: 3.00
        },

        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          subtotal: 30.00,
          saved: 0
        }
      ],
      savedTotal: 3.00,
      total: 36.00
    };
    expect(receipt).toEqual(expectReceipt);
  });

  it("get string receipt", () => {
    let receipt = {
      receiptItems: [
        {
          cartItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 3
          },
          subtotal: 6.00,
          saved: 3.00
        },

        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          subtotal: 30.00,
          saved: 0
        }
      ],
      savedTotal: 3.00,
      total: 36.00
    };
    let receiptTexts = getReceiptText(receipt);

    const expectReceiptTexts = `***<没钱赚商店>收据***
名称：雪碧，数量：3瓶，单价：3.00(元)，小计：6.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
----------------------
总计：36.00(元)
节省：3.00(元)
**********************`;
    expect(receiptTexts).toEqual(expectReceiptTexts);
  });


  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', () => {

    spyOn(console, 'log');

    printReceipt(inputs);


    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

