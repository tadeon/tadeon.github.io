var privateNet = [
    ["10.0.0.0", "255.0.0.0"],
    ["127.0.0.0", "255.0.0.0"],
    ["172.16.0.0", "255.240.0.0"],
    ["192.168.0.0", "255.255.0.0"],
]
var direct = "DIRECT";
var ip4Re = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/
var proxy = "SOCKS5 127.0.0.1:1080; SOCKS 127.0.0.1:1080";

var whitelistDomains = [
"yapfiles.ru",
"yaplakal.com",
"pikabu.ru",
"yandex.ru",
"vkvideo.ru",
"vk.ru",
"vk.com",
"ok.ru",
"okcdn.ru",  
"1adm.ru",  
"t-an.ru",  
"hostping.ru",  
"ozon.ru",  
"selectel.ru",  
"ipg.su",
"ipinfo.io",
"ceflafinishing.ru",
"dzen.ru",
"rutube.ru",
"1ep.ru",
"bitrix24.ru",
"bitrix24.net",
"riko-group.com",
"d3.ru"
];

var ProxyListDomains = [
    "traefik.aws01.hostping.ru",
    "whatismyipaddress.com"
];

function FindProxyForURL(url, host) {
    if (host.match(ip4Re)) {
        for (var i = 0; i < privateNet.length; i++) {
            if (isInNet(host, privateNet[i][0], privateNet[i][1])) return direct;  // Private IP
        }
        return proxy;  // External IP
    }

    for (var i = 0; i < ProxyListDomains.length; i++) {
        var domain = ProxyListDomains[i];
        if (host === domain) {
            return proxy;
        }
        if (shExpMatch(host, "*." + domain)) {
            return proxy;
        }
    }

    for (var i = 0; i < whitelistDomains.length; i++) {
        var domain = whitelistDomains[i];
        if (host === domain) {
            return direct;
        }
        if (shExpMatch(host, "*." + domain)) {
            return direct;
        }
    }
    
    return proxy;
}
