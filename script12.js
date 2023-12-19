let center = [55.75244503863624, 37.62483958203125];

let balloon_image = "/icons/baloon-icon.png";
let shadow_balloon_image = "/icons/shadow-baloon-icon.png";
let anket_ref = "http://portal.tatneftm.ru:8096/";

let zoom_in_icon = "/icons/add-button.png";
let zoom_out_icon = "/icons/minus-button.png";

let get_active_vacancies_file = "get_active_vacancies4.php";
let get_coords_file = "get_coords4.php";

let cluster_icon = "/icons/cluster.png";
let shadow_cluster_icon = "/icons/cluster-shadow.png";

function draw_baloons(map, listBoxControl) {
  var xhr = new XMLHttpRequest();
  var url = get_coords_file;
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        listBoxControl.events.add(["select", "deselect"], function (e) {
          var listBoxItem = e.get("target");
          var filters = ymaps.util.extend(
            {},
            listBoxControl.state.get("filters"),
          );
          filters[listBoxItem.data.get("content")] = listBoxItem.isSelected();
          listBoxControl.state.set("filters", filters);
        });

        var filterMonitor = new ymaps.Monitor(listBoxControl.state);
        filterMonitor.add("filters", function (filters) {
          // Применим фильтр.
          objectManager.setFilter(getFilterFunction(filters));
        });

        function getFilterFunction(categories) {
          return function (obj) {
            var content = obj.properties.balloonContent;
            return categories[content];
          };
        }

        var clusterer = new ymaps.Clusterer({
          preset: "islands#invertedDarkGreenClusterIcons",
          clusterDisableClickZoom: true,
          groupByCoordinates: false,
          clusterHideIconOnBalloonOpen: false,
          geoObjectHideIconOnBalloonOpen: false,
          clusterOpenBalloonOnClick: true,
          clusterBalloonPanelMaxMapArea: 0,
          clusterBalloonContentLayoutWidth: 200,
          clusterBalloonContentLayoutHeight: 150,
        });

        map.geoObjects.add(clusterer);

        var objectManager = new ymaps.ObjectManager({
          clusterize: true,
          gridSize: 64,
        });

        placemarks = [];
        var response = JSON.parse(xhr.responseText);

        for (var i = 0; i < response.length; i++) {
          var longitude = response[i].longitude;
          var latitude = response[i].latitude;
          var adress = response[i].adress;
          var vacancy = response[i].vacancy_name;

          placemarks.push({
            coordinates: [latitude, longitude],
            vacancy: vacancy,
            adress: adress,
          });
        }

        objectManager.add(
          placemarks.map(function (obj, id) {
            var feature = {
              type: "Feature",
              id: id,
              geometry: {
                type: "Point",
                coordinates: obj.coordinates,
              },
              properties: {
                balloonContent: obj.vacancy,
                balloonContentHeader: `<b>Вакансия:</b> ${obj.vacancy}`,
                balloonContentBody:
                  `<div class="balloon__address">${obj.adress}</div>` +
                  `<br><a href="${anket_ref}">Заполнить анкету</a><br/>`,
              },
              options: {
                iconLayout: "default#image",
                iconImageHref: balloon_image,
                iconImageSize: [42, 42],
                iconImageOffset: [-19, -44],
              },
            };

            return feature;
          }),
        );

        objectManager.clusters.options.set({
          preset: "islands#invertedDarkGreenClusterIcons",
        });

        objectManager.clusters.options.set({
          clusterIconLayout: "default#image",
          clusterIconImageHref: cluster_icon,
          clusterIconImageSize: [44, 44],
          clusterDisableClickZoom: true,
        });

        objectManager.clusters.options.set({
          clusterDisableClickZoom: true,
          clusterOpenBalloonOnClick: false,
          clusterBalloonContentLayoutWidth: 200,
          clusterBalloonContentLayoutHeight: 150,
        });

        objectManager.clusters.events.add("mouseenter", function (e) {
          var clusterId = e.get("objectId");
          objectManager.clusters.setClusterOptions(clusterId, {
            iconImageHref: shadow_cluster_icon,
          });
        });

        objectManager.clusters.events.add("mouseleave", function (e) {
          var clusterId = e.get("objectId");
          objectManager.clusters.setClusterOptions(clusterId, {
            iconImageHref: cluster_icon,
          });
        });

        objectManager.objects.events.add("mouseenter", function (e) {
          var obj = e.get("objectId");
          objectManager.objects.setObjectOptions(obj, {
            iconImageHref: shadow_balloon_image,
          });
        });

        objectManager.objects.events.add("mouseleave", function (e) {
          var obj = e.get("objectId");
          objectManager.objects.setObjectOptions(obj, {
            iconImageHref: balloon_image,
          });
        });

        map.geoObjects.add(objectManager);
      } else {
        console.error("Ошибка запроса: " + xhr.status);
      }
    }
  };

  xhr.send();
}

function draw_vacancies(map) {
  var xhr = new XMLHttpRequest();
  var url = get_active_vacancies_file;
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);

        objectManager = new ymaps.ObjectManager({
          // Чтобы метки начали кластеризоваться, выставляем опцию.
          clusterize: true,
          // ObjectManager принимает те же опции, что и кластеризатор.
          gridSize: 64,
        });

        map.geoObjects.add(objectManager);

        var arr = new Array(response.length);

        for (var i = 0; i < response.length; i++) {
          arr[i] = response[i].vacancy_name;
        }

        var listBoxItems = arr.map(function (title) {
          return new ymaps.control.ListBoxItem({
            data: {
              content: title,
            },
            state: {
              selected: true,
            },
          });
        });

        var listBoxControl = new ymaps.control.ListBox({
          data: {
            content: "Выберите вакансию",
            title: "Выберите вакансию",
          },
          items: listBoxItems,
          state: {
            expanded: false,
            filters: listBoxItems.reduce(function (filters, filter) {
              filters[filter.data.get("content")] = filter.isSelected();
              return filters;
            }, {}),
          },
        });

        map.controls.add(listBoxControl, { float: "left" });

        draw_baloons(map, listBoxControl);
      } else {
        console.error("Ошибка запроса: " + xhr.status);
      }
    }
  };

  xhr.send();
}

function custom_zoom_control(map) {
  // Создадим пользовательский макет ползунка масштаба.
  (ZoomLayout = ymaps.templateLayoutFactory.createClass(
    "<div style='position: fixed; right: 10px; top: 50%;'>" +
      `<div id='zoom-in' class='btn'><img src=${zoom_in_icon} style='width: 40px; height: 40px;'><i class='icon-plus'></i></div>` +
      `<div id='zoom-out' class='btn'><img src=${zoom_out_icon} style='width: 40px; height: 40px;'><i class='icon-minus'></i></div>` +
      "</div>",
    {
      // Переопределяем методы макета, чтобы выполнять дополнительные действия
      // при построении и очистке макета.
      build: function () {
        // Вызываем родительский метод build.
        ZoomLayout.superclass.build.call(this);

        // Привязываем функции-обработчики к контексту и сохраняем ссылки
        // на них, чтобы потом отписаться от событий.
        this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
        this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

        // Начинаем слушать клики на кнопках макета.
        $("#zoom-in").bind("click", this.zoomInCallback);
        $("#zoom-out").bind("click", this.zoomOutCallback);
      },

      clear: function () {
        // Снимаем обработчики кликов.
        $("#zoom-in").unbind("click", this.zoomInCallback);
        $("#zoom-out").unbind("click", this.zoomOutCallback);

        // Вызываем родительский метод clear.
        ZoomLayout.superclass.clear.call(this);
      },

      zoomIn: function () {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
      },

      zoomOut: function () {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
      },
    },
  )),
    (zoomControl = new ymaps.control.ZoomControl({
      options: { layout: ZoomLayout },
    }));

  map.controls.add(zoomControl);
}

function set_geolocation(map) {
  ymaps.geolocation
    .get({
      provider: "auto",
      // Карта автоматически отцентрируется по положению пользователя.
      mapStateAutoApply: true,
    })
    .then(function (result) {
      map.geoObjects.add(result.geoObjects);
    });
}

function init() {
  let map = new ymaps.Map(
    "map-test",
    {
      center: center,
      zoom: 8,
      controls: ["geolocationControl"],
    },
    {
      searchControlProvider: "yandex#search",
    },
  );

  custom_zoom_control(map);

  set_geolocation(map);

  draw_vacancies(map);
}

ymaps.ready(init);