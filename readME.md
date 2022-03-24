{
    "pages": [
      "pages/index/index",
      "pages/lucky-turntable/lucky-turntable",
      "pages/blessing/blessing",
      "pages/menu/index",
      "pages/wifi/index",
      "pages/cloud/index"
    ],
    "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#D8322E",
        "navigationBarTitleText": "个人主页",
        "navigationBarTextStyle": "white"
    },
    "tabBar": {
      "color": "#7A7E83",
      "selectedColor": "#D90C18",
      "list": [
        {"pagePath": "pages/index/index", "text": "首页", "iconPath": "/images/tab/tab_home@2x.png", "selectedIconPath": "/images/tab/tab_home_sel@2x.png"},
        {"pagePath": "pages/index/index", "text": "我的", "iconPath": "/images/tab/tab_my@2x.png", "selectedIconPath": "/images/tab/tab_my_sel@2x.png"}
      ]
    },
    "sitemapLocation": "sitemap.json",
    "lazyCodeLoading": "requiredComponents",
    "permission": {
        "scope.userLocation": {
          "desc": "根据位置信息连接WIFI"
        }
      }
}