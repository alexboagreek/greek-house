const init = () => {
  const myMap = new ymaps.Map(
    "map",
    {
      center: [51.53227981064729, 46.02023553988656],
      zoom: 18,
      controls: ["smallMapDefaultSet"],
    },
    {}
  );
  
  //отключаем зум колёсиком мышки

  myMap.behaviors.disable('scrollZoom');
  //на мобильных устройствах... (проверяем по userAgent браузера)
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      //... отключаем перетаскивание карты
      myMap.behaviors.disable('drag');
  }

  const myPlacemark = new ymaps.Placemark(
    [51.53227981064729, 46.02023553988656],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "assets/img/mark.svg",
      iconImageSize: [50, 50],
      iconImageOffset: [-30, -55],
    }
  );
  myMap.geoObjects.add(myPlacemark);
};
ymaps.ready(init);

const createElem = (tag, attr) => {
  const elem = document.createElement(tag);

  return Object.assign(elem, { ...attr });
};

const createModal = (title, description) => {
  const overlayElem = createElem('div', {className: 'modal'});
  const modalElem = createElem('div', {className: 'modal__block'});
  const modalContainerElem = createElem('div', {className: 'modal__container'});

  const titleElem = createElem('h2', {
    className: 'modal__title',
    textContent: `Заказать ${title}`,
  });

  const descriptionElem = createElem('p', {
    className: 'modal__description',
    textContent: description,
  });

  const formElem = createElem('form', {
    className: 'modal__form',
    method: 'post',
    action: 'http://jsonplaceholder.tyicode.com/posts',
    id: 'order',
  });

  const nameLabelElem = createElem('label', { className: 'modal__label'});
  const nameSpanElem = createElem('span', {
    className: 'modal__text',
    textContent: 'Имя',
  });

  const nameInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваше имя',
    name: 'name',
    required: true,
  });


  const phoneLabelElem = createElem('label', { className: 'modal__label'});
  const phoneSpanElem = createElem('span', {
    className: 'modal__text',
    textContent: 'Телефон',
  });

  const phoneInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваш телефон',
    name: 'phone',
    required: true,
  });


  const hideInput = createElem('input', {
    type: 'hidden',
    name: 'product',
    value: title,
  });

  const btnSubmit = createElem('button', {
    className: 'modal__btn',
    textContent: 'Заказать',
    type: 'sumbmit',
  });
  btnSubmit.setAttribute('form', 'order');

  const closeModalBtn = createElem('button', {
    className: 'modal__close',
    innerHTML: `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.75 2.0125L15.9875 0.25L9 7.2375L2.0125 0.25L0.25 2.0125L7.2375 9L0.25 15.9875L2.0125 17.75L9 10.7625L15.9875 17.75L17.75 15.9875L10.7625 9L17.75 2.0125Z" fill="#00654E"/>
    </svg>
    `,
  });

  overlayElem.addEventListener('click', event => {
    const target = event.target;
    if (target === overlayElem || target.closest('.modal__close')) {
      overlayElem.remove();
    }
  });


  nameLabelElem.append(nameSpanElem, nameInputElem);
  phoneLabelElem.append(phoneSpanElem, phoneInputElem);
  formElem.append(nameLabelElem, phoneLabelElem, hideInput);

  modalContainerElem.append(titleElem, descriptionElem, formElem, btnSubmit, closeModalBtn);
  modalElem.append(modalContainerElem);
  overlayElem.append(modalElem);
  return overlayElem;
};

const productTitle = document.querySelectorAll('.product__title');
const productDescription = document.querySelectorAll('.product__description');
const productBtn = document.querySelectorAll('.product__btn');

for (let i = 0; i < productBtn.length; i++) {
  productBtn[i].addEventListener('click', () => {
    const title = productTitle[i].textContent;
    const description = productDescription[i].textContent;

    const modal = createModal(title, description);
    document.body.append(modal);
  });
   
}


try {

  const mute = document.querySelector('.mute__checkbox');
  const audio = new Audio('../assets/audio/Танцы - Сиртаки [греческий танец] (mp3store.cc).mp3');
  
  const checkMute = () => {
      
      if(mute.checked) {
          audio.play().catch(() => {
              mute.checked = false;
          });
      } else {
          audio.pause();
      }
  };

  if (mute) {
      setTimeout(checkMute, 2000)
  }

  mute.addEventListener('change', checkMute);

} catch {
  console.log('На данной странице нет музыки');
}

