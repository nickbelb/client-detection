'use strict';

function selectObject(selector, parent = document) {
    return parent.querySelector(selector);
}

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

const os = selectObject('#os');
const systemLanguage =selectObject('#language');
const browser = selectObject('#browser');
const width =selectObject('#width');
const height = selectObject('#height');
const windowOrientation =selectObject('#orientation');
const batteryLevel = selectObject('#batteryLevel');
const batteryStatus =selectObject('#battery-status');
const pageStatus = selectObject('#page-status');
const statusPage=selectObject('#status-card');

function checkWindowProperties() {
    let windowDimensionWidth = window.innerWidth;
    let windowDimensionHeight  = window.innerHeight;
    width.innerText =`${windowDimensionWidth} px`;
    height.innerText =`${windowDimensionHeight} px`;
    windowOrientation.innerText = `${windowDimensionHeight>windowDimensionWidth ?'Portrait':'Landscape'}`;
}

//getBattery returns a promise , you have to use .then to catch the object in order to use the other properties
function checkBattery(){
    navigator.getBattery().then((battery) => {
      if(battery.charging == false){
        batteryLevel.innerText = `Not Available`;
        batteryStatus.innerText = `idle`;
      }else{
        batteryLevel.innerText = `${battery.level*100} %`;
        batteryStatus.innerText = `Charging`;
      }
      onEvent('chargingchange',battery,checkBattery);
      onEvent('levelchange',battery,checkBattery);
    });

}

function getOPeratingSystem(){
    const operatingSystems =['Linux','Windows','Mac'];
    let currentSO='';
    operatingSystems.forEach(element => {
        if(navigator.userAgent.includes(element)){
            currentSO=element;
        };
    });
    return currentSO;
}



function checkSystemProperties() {
    systemLanguage.innerText=` ${navigator.language}`;
    let systemSO=getOPeratingSystem();
    os.innerText=` ${ systemSO == '' ? 'Not Available':systemSO}`;
}

function checkOnlineStatus() {
    let online=navigator.onLine;
    if(online == false){
        pageStatus.innerText='OFFLINE';
        statusPage.style.backgroundColor='#e32636';
    }
    else{
        pageStatus.innerText='ONLINE';
        statusPage.style.backgroundColor='#ace1af';
    }
    onEvent('offline',window,checkOnlineStatus);
    onEvent('online',window,checkOnlineStatus);
}



onEvent('load',window,function(){
    checkOnlineStatus();
    checkSystemProperties();
    checkWindowProperties();
    checkBattery();
}); 

onEvent('resize',window,function(){
    checkWindowProperties();
}); 


