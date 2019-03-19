'use strict';

const basket = {
  productsInBasket: [],
  basketContainer: document.querySelector('#basket'),
  init() {
    const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
      button.addEventListener('click',
          event => this.addProductToBasket(event.target.dataset.name,
              event.target.dataset.price));
    }

  },
  /**
   * Добавляем товар в корзину (productsInBasket).
   * @param name {string} - Имя товара
   * @param price {number} - Стоимость товара
   *
   */
  addProductToBasket(name, price) {
    const product = {
      name,
      price,
      quantity: 1,
    };
    //Если такой товар уже есть, то увеличиваем количество на 1
    let isInBasket = false;
    for (const currProduct of this.productsInBasket) {
      if (product.name === currProduct.name) {
        currProduct.quantity += 1;
        isInBasket = true;
        break;
      }
    }
    //Добавляем новый товар
    if (!isInBasket) {
      this.productsInBasket.push(product);
    }
    //Обновляем корзину
    this.render();
  },
  /**
   * Считаем итоговую стоимость товаров в корзине
   * @returns {number} - итоговая стоимость товаров в корзине
   */
  getTotalPrice() {
    let sum = 0;
    for (const product of this.productsInBasket) {
      sum += +product.price * +product.quantity;
    }
    return sum;
  },
  /**
   * Возращает true если корзина пуста
   * @returns {boolean}
   */
  isBasketEmpty(){
    return this.productsInBasket.length === 0;
  },
  render() {
    //Сохраняем заголовок
    const header = this.basketContainer.querySelector('tr');
    //Очищаем таблицу корзины
    this.basketContainer.innerHTML = '';
    this.basketContainer.appendChild(header);

    if (!this.isBasketEmpty()) {
      for (const product of this.productsInBasket) {
        const row = document.createElement('tr');
        for (const prop in product) {
          const col = document.createElement('td');
          if (product.hasOwnProperty(prop)) {
            col.innerText = product[prop];
          }
          row.appendChild(col.cloneNode(true));
        }
        //Добавляем общую стоимость по одной позиции товара
        const totalPrice = document.createElement(('td'));
        totalPrice.innerText = +product.quantity * +product.price;
        row.appendChild(totalPrice);

        //Добавляем строку с товаром в таблицу корзины
        this.basketContainer.appendChild(row.cloneNode(true));
      }
      // Добавляем информацию об итоговой стоимости товаров в корзине
      const totalSumTr = document.createElement('tr');
      const totalSumTd = document.createElement('td');
      totalSumTd.innerText = `Итого: ${this.getTotalPrice()}`;
      totalSumTr.appendChild(totalSumTd);
      this.basketContainer.appendChild(totalSumTr);

    } else {
      // Отображение информации о том, что корзина пуста (пока не используется, т.к. не реализовано удаление товаров из корзины)
      const empty = document.createElement('tr');
      empty.innerHTML = '<td>Корзина пуста</td>';
      this.basketContainer.appendChild(empty);
    }
  },
};

window.onload = () => basket.init();
