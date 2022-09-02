import React, { useState } from "react";
import { Browser } from '@syncfusion/ej2-base';
import FastingDialog from "./FastingDialog";
import DietDialog from "./DietDialog";
import ProfileDialog from "./ProfileDialog";
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';

const Activities = React.lazy(() =>
    import('Activities/Activities')
)

const Profile = React.lazy(() =>
    import('Profile/Profile')
)

const Diet = React.lazy(() =>
    import('Diet/Diet')
)

const Fasting = React.lazy(() =>
    import('Fasting/Fasting')
)
var masterData = [];
var getInitial = true;
let pieData = [];
let x;
let isFastEnd = false;
let countStartDate;
let countDownDate;
var isToday = true;
var currentDinnerMenu = [];
var currentSnack2Menu = [];
var currentBreakFastMenu = [];
var currentSnack1Menu = [];
var currentLunchMenu = [];
function Tab() {
    let innerWidth = window.innerWidth;
    let fastStartTime;
    let fastEndTime;
    let changeTimeBtnText = "CHANGE TIME";
    let sliderValue = "Completed";
    var sleepInMinutes = Math.round(Math.random() * (480 - 300) + 300);
    let breakFastRecom = 440;
    let snack1Recom = 165;
    let lunchRecom = 440;
    let snack2Recom = 165;
    let dinnerRecom = 440;
    let hidden = false;
    let currentMenuHeader;
    let currentMenu;
    let currentRecom = 0;
    let currentAddedMenu;
    let currentQuantity = 1;
    let currentTotalCal = 0;
    var today = new Date();
    var currentDate = today;
    var maxDate = new Date();
    var burnedCalories = 0;
    var todaysWorkoutPercent = 80;
    var theme = 'Tailwind';
    let profileStats = { name: 'John Watson', age: 24, location: 'India', weight: 70, height: 165, goal: 65, email: 'john.watson@gmail.com', weightMes: 'kg', goalMes: 'kg', heightMes: 'cm' };
    let weightGaugeBackground = '#FFF7EC';
    let gauge;
    let dlgButtons = [{ click: menuCancelBtnClick.bind(this), buttonModel: { content: 'CANCEL', cssClass: 'e-menu-cancel' } }, { click: menuDlgBtnClick.bind(this), buttonModel: { content: 'ADD MENU', cssClass: 'e-menu-add' } }];
    let profiledlgButtons = [{ click: profileDialogCancelBtnClick.bind(this), buttonModel: { content: 'CANCEL', cssClass: 'e-menu-cancel' } }, { click: profileDialogBtnClick.bind(this), buttonModel: { content: 'UPDATE PROFILE', cssClass: 'e-menu-add' } }];
    let minimumDate = new Date(new Date().setHours(0, 0, 0));
    let maximumDate = new Date(new Date(new Date().setDate(minimumDate.getDate() + 1)).setHours(24, 0, 0));
    let currentWtUnit = 'KG';
    let currentHtUnit = 'CM';
    let weightSliderLimit = { enabled: true, minStart: currentWtUnit === 'KG' ? 10 : 20 };
    let heightSliderLimit = { enabled: true, minStart: currentHtUnit === 'CM' ? 30 : 1 };
    var breakfastMenu = [
        { item: 'Banana', cal: 105, fat: 0.4, carbs: 27, proteins: 1.3, sodium: 0.0012, iron: 0.00031, calcium: 0.005 },
        { item: 'Bread', cal: 77, fat: 1, carbs: 14, proteins: 2.6, sodium: 0.142, iron: 0.0036, calcium: 0.260 },
        { item: 'Boiled Egg', cal: 78, fat: 5.3, carbs: 0.6, proteins: 6.3, sodium: 0.062, iron: 0.001, calcium: 0.05 },
        { item: 'Wheat Chapathi', cal: 120, fat: 3.7, carbs: 18, proteins: 3.1, sodium: 0.119, iron: 0.001, calcium: 0.01 },
        { item: 'Dosa', cal: 168, fat: 3.7, carbs: 29, proteins: 3.9, sodium: 0.094, iron: 0.0005, calcium: 0.01 },
        { item: 'Tea', cal: 5, fat: 0.1, carbs: 1.4, proteins: 0.1, sodium: 0.0008, iron: 0, calcium: 0.02 },
        { item: 'Coffee', cal: 2, fat: 0.1, carbs: 0, proteins: 0.3, sodium: 0.047, iron: 0, calcium: 0.039 },
        { item: 'Milk', cal: 122, fat: 4.8, carbs: 12, proteins: 8.1, sodium: 0.115, iron: 0, calcium: 0.125 }
    ];
    var snackMenu = [
        { item: 'Banana', cal: 105, fat: 0.4, carbs: 27, proteins: 1.3, sodium: 0.0012, iron: 0.00031, calcium: 0.006 },
        { item: 'Apple', cal: 95, fat: 0.3, carbs: 25, proteins: 0.5, sodium: 0.018, iron: 0.0001, calcium: 0.0085 },
        { item: 'Orange', cal: 69, fat: 0.2, carbs: 18, proteins: 1.3, sodium: 0.0014, iron: 0.0001, calcium: 0.04 },
        { item: 'Samosa', cal: 262, fat: 17, carbs: 24, proteins: 3.5, sodium: 0.423, iron: 0.0005, calcium: 0.013 },
        { item: 'Peas', cal: 134, fat: 0.3, carbs: 25, proteins: 8.6, sodium: 0.048, iron: 0.00015, calcium: 0.036 },
        { item: 'Tea', cal: 5, fat: 0.1, carbs: 1.4, proteins: 0.1, sodium: 0.0008, iron: 0, calcium: 0.02 },
        { item: 'Coffee', cal: 2, fat: 0.1, carbs: 0, proteins: 0.3, sodium: 0.047, iron: 0, calcium: 0.039 },
        { item: 'Biscuits', cal: 37, fat: 1.2, carbs: 6.2, proteins: 0.5, sodium: 0.002, iron: 0.00031, calcium: 0.03 }
    ];

    var lunchMenu = [
        { item: 'Plain Rice', cal: 205, fat: 0.4, carbs: 45, proteins: 4.3, sodium: 0.0016, iron: 0.0002, calcium: 0.011 },
        { item: 'Roti', cal: 120, fat: 3.7, carbs: 18, proteins: 3.1, sodium: 0.119, iron: 0.003, calcium: 0.01 },
        { item: 'Moong Dal', cal: 236, fat: 2, carbs: 41, proteins: 16, sodium: 0.465, iron: 0.0032, calcium: 0.06 },
        { item: 'Mixed Vegetables', cal: 45, fat: 0.5, carbs: 9.7, proteins: 2.4, sodium: 0.043, iron: 0.0021, calcium: 0.022 },
        { item: 'Curd Rice', cal: 207, fat: 3.2, carbs: 38, proteins: 6.1, sodium: 0.167, iron: 0.0006, calcium: 0.272 },
        { item: 'Chicken Curry', cal: 243, fat: 11, carbs: 7.5, proteins: 28, sodium: 0.073, iron: 0.0008, calcium: 0.023 }
    ];
    let isDevice = Browser.isDevice;

    let waterGaugeAnnotation = isDevice ? [
        {
            content:
                '<div class="e-water-annotation-text">Poor</div>',
            axisIndex: 0,
            axisValue: 5,
            x: 60,
            zIndex: '1',
        },
        {
            content:
                '<div class="e-water-annotation-text">Good</div>',
            axisIndex: 0,
            axisValue: 40,
            x: 60,
            zIndex: '1',
        },
        {
            content:
                '<div class="e-water-annotation-text">Almost</div>',
            axisIndex: 0,
            axisValue: 70,
            x: 60,
            zIndex: '1',
        },
        {
            content:
                '<div class="e-water-annotation-text">Perfect!</div>',
            axisIndex: 0,
            axisValue: 95,
            x: 60,
            zIndex: '1',
        },
    ] : [
        {
            content:
                '<div class="e-water-annotation-text">Poor</div>',
            axisIndex: 0,
            axisValue: 5,
            y: 50,
            zIndex: '1',
        },
        {
            content:
                '<div class="e-water-annotation-text">Good</div>',
            axisIndex: 0,
            axisValue: 40,
            y: 50,
            zIndex: '1',
        },
        {
            content:
                '<div class="e-water-annotation-text">Almost</div>',
            axisIndex: 0,
            axisValue: 70,
            y: 50,
            zIndex: '1',
        },
        {
            content:
                '<div class="e-water-annotation-text">Perfect!</div>',
            axisIndex: 0,
            axisValue: 95,
            y: 50,
            zIndex: '1',
        },
    ];
    var consumedWaterCount = 4;
    var expectedWaterAmount = 2400;
    var consumedWaterAmount = 600;
    var lastSelectItem = '';
    var currentDinnerCalories = 0;
    var currentSnack2Calories = 0;
    var isBreakFastMenuAdded = true;
    var isSnack1MenuAdded = true;
    var isLunchMenuAdded = true;
    var isSnack2MenuAdded = false;
    var isDinnerMenuAdded = false;
    var currentBreakFastMenuText;
    var currentLunchMenuText;
    var currentSnack1MenuText;
    var currentSnack2MenuText;
    var currentDinnerMenuText;
    var currentBreakFastCalories = 0;
    var currentSnack1Calories = 0;
    var currentLunchCalories = 0;
    var currentTotalProteins = 0;
    var currentTotalFat = 0;
    var currentTotalCarbs = 0;
    var currentTotalCalcium = 0;
    var currentTotalIron = 0;
    var currentTotalSodium = 0;
    var consumedCalories = 0;
    let datePickerWidth = '100%';
    let dropDownData = ['Weekly', 'Monthly'];
    let diff = 16;
    let circulargauge = [{
        ranges: [
            {
                start: 0,
                end: 100,
                radius: '100%',
                startWidth: 30,
                endWidth: 30,
                color: '#E1E9ED',
                roundedCornerRadius: 15,
            },
            {
                start: 0,
                end: 100,
                radius: '100%',
                startWidth: 30,
                endWidth: 30,
                color: '#CDD9E0',
                roundedCornerRadius: 15,
                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',
                    colorStop: [
                        { color: '#FB5F64', offset: '0%', opacity: 0.9 },
                        { color: '#FC9662', offset: '70%', opacity: 0.9 }]
                }
            },
            {
                start: 2,
                end: 98,
                radius: '91%',
                startWidth: 5,
                endWidth: 5,
                roundedCornerRadius: 2,
                color: '#FFFFFF',
                opacity: 0.35
            },
        ],
        annotations: isDevice ? [{
            angle: 0,
            zIndex: '1',
            radius: '0%'
        },
        {
            zIndex: '1',
            radius: '89%',
            angle: 350,
            content: '<div class="e-gauge-percent-img icon-Calories"></div>'
        },
        {
            zIndex: '1',
            radius: '89%',
            angle: 60,
            content: '<div class="e-gauge-status-img icon-Diet"></div>'
        },
        {
            zIndex: '1',
            radius: '89%',
            angle: 280,
            content: '<div class="e-gauge-status-img icon-Thunder"></div>'
        }] : [{
            angle: 0,
            zIndex: '1',
            radius: '0%'
        },
        {
            zIndex: '1',
            radius: '90%',
            angle: 350,
            content: '<div class="e-gauge-percent-img icon-Calories"></div>'
        },
        {
            zIndex: '1',
            radius: '89%',
            angle: 60,
            content: '<div class="e-gauge-status-img icon-Diet"></div>'
        },
        {
            zIndex: '1',
            radius: '89%',
            angle: 280,
            content: '<div class="e-gauge-status-img icon-Thunder"></div>'
        }]
    }];
    let waterGaugeAxes = [
        {
            minimum: 0,
            maximum: 100,
            line: {
                width: 0,
            },
            labelStyle: {
                font: {
                    opacity: 0,
                },
            },
            majorTicks: {
                interval: 10,
                color: '#3993F5',
                offset: 5,
            },
            minorTicks: {
                interval: 2,
                color: '#3993F5',
                offset: 5,
            },
            opposedPosition: true,
            pointers: [
                {
                    value: Math.round((consumedWaterAmount / expectedWaterAmount) * 100),
                    height: 50,
                    width: 50,
                    roundedCornerRadius: 35,
                    type: 'Bar',
                    color: '#61a9f7',
                },
                {
                    value: 8,
                    width: 5,
                    height: 5,
                    offset: -60,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 8 ? 1 : 0
                },
                {
                    value: 15,
                    width: 4,
                    height: 4,
                    offset: -80,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 15 ? 1 : 0
                },
                {
                    value: 21,
                    width: 7,
                    height: 7,
                    offset: -75,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 21 ? 1 : 0
                },
                {
                    value: 27,
                    width: 8,
                    height: 8,
                    offset: -65,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 27 ? 1 : 0
                },
                {
                    value: 37,
                    width: 4,
                    height: 4,
                    offset: isDevice ? -85 : -55,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 37 ? 1 : 0
                },
                {
                    value: 42,
                    width: 6,
                    height: 6,
                    offset: -75,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 42 ? 1 : 0
                },
                {
                    value: 48,
                    width: 8,
                    height: 8,
                    offset: isDevice ? -80 : -58,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 48 ? 1 : 0
                },
                {
                    value: 56,
                    width: 5,
                    height: 5,
                    offset: -72,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 56 ? 1 : 0
                },
                {
                    value: 64,
                    width: 6,
                    height: 6,
                    offset: -79,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 64 ? 1 : 0
                },
                {
                    value: 72,
                    width: 8,
                    height: 8,
                    offset: isDevice ? -85 : -55,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 72 ? 1 : 0
                },
                {
                    value: 80,
                    width: 5,
                    height: 5,
                    offset: -70,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 80 ? 1 : 0
                },
                {
                    value: 86,
                    width: 6,
                    height: 6,
                    offset: -77,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 86 ? 1 : 0
                },
                {
                    value: 94,
                    width: 8,
                    height: 8,
                    offset: isDevice ? -80 : -54,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 94 ? 1 : 0
                },
            ],
        },
    ];


    let modifyHeaderTitle = "Change Your Weight";
    let modifyBtnGroup = ['KG', 'LB'];
    let profileDialogInstance;
    let heightGauge;
    let heightSlider;
    let weightGauge;
    let weightSlider;
    let lightRadio;
    let darkRadio;
   
    var [state, setState] = useState({
        heartRate: Math.round(Math.random() * (100 - 70) + 70),
        steps: Math.round(Math.random() * (3000 - 1000) + 1000),
        consumedCalories: Math.round(Math.random() * (3000 - 1000) + 1000),
        sleepInMinutes: sleepInMinutes,
        sleepInHours: getSleepInHours(sleepInMinutes),
        currentDropDownData: dropDownData,
        gridData: getData(),
        activityChartWeeklyDietData: getChartData('Diet', 'Weekly'),
        activityChartWeeklyWorkoutData: getChartData('Workout', 'Weekly'),
        activityChartMonthDietData : getChartData('Diet', 'Monthly'),
        activityChartMonthWorkoutData : getChartData('Workout', 'Monthly'),
        morningWalk: Math.round(Math.random() * (3000 - 1000) + 1000),
        eveningWalk: Math.round(Math.random() * (3000 - 1000) + 1000),
        breakfastWaterTaken: Math.round(Math.random() * (5 - 2) + 2),
        lunchWaterTaken: Math.round(Math.random() * (5 - 2) + 2),
        eveningWaterTaken: Math.round(Math.random() * (5 - 2) + 2),
        expectedWaterAmount: 2400,
        expectedCalories: 3000,
        todayActivities: [],
        datePickerDate: currentDate,
        currentDate: currentDate,
        isSmallDevice: false,
        pieData: pieData,
        currentBreakFastMenuText: currentBreakFastMenuText,
        currentBreakFastCalories: currentBreakFastCalories,
        currentSnack1MenuText: currentSnack1MenuText,
        currentSnack1Calories: currentSnack1Calories,
        currentLunchMenuText: currentLunchMenuText,
        currentLunchCalories: currentLunchCalories,
        currentSnack2MenuText: currentSnack2MenuText,
        currentSnack2Calories: currentSnack2Calories,
        currentDinnerMenuText: currentDinnerMenuText,
        currentDinnerCalories: currentDinnerCalories,
        currentTotalProteins: currentTotalProteins,
        currentTotalFat: currentTotalFat,
        currentTotalCarbs: currentTotalCarbs,
        currentTotalCalcium: currentTotalCalcium,
        currentTotalSodium: currentTotalSodium,
        currentTotalIron: currentTotalIron,
        isBreakFastMenuAdded: isBreakFastMenuAdded,
        isSnack1MenuAdded: isSnack1MenuAdded,
        isLunchMenuAdded: isLunchMenuAdded,
        isSnack2MenuAdded: isSnack2MenuAdded,
        isDinnerMenuAdded: isDinnerMenuAdded,
        consumedWaterCount: consumedWaterCount,
        consumedWaterAmount: consumedWaterAmount,
        burnedCalories: burnedCalories,
        weightChartData: getWeightChartData(),
        waterGaugeAnnotation: waterGaugeAnnotation,
        waterGaugeAxes: waterGaugeAxes,
        fastStartTime: fastStartTime,
        fastEndTime: fastEndTime,
        countStartDate: countStartDate,
        countDownDate: countDownDate,
        circulargauge: circulargauge,
        changeTimeBtnText: changeTimeBtnText,
        currentMenuHeader: currentMenuHeader,
        currentMenu: currentMenu,
        currentRecom: currentRecom,
        currentAddedMenu: currentAddedMenu,
        currentQuantity: currentQuantity,
        currentTotalCal: currentTotalCal,
        currentBreakFastMenu: currentBreakFastMenu,
        currentSnack1Menu: currentSnack1Menu,
        currentSnack2Menu: currentSnack2Menu,
        currentLunchMenu: currentLunchMenu,
        currentDinnerMenu: currentDinnerMenu,
        profileStats: profileStats,
        weightGaugeBackground: weightGaugeBackground,
        theme: theme,
        hidden: false,
        profileHidden: false,
        isToday: true
    });

    let countStartDateMonth;
    let currentDateMonth;
    if (getInitial) {
        getInitial = false;
        currentBreakFastMenu = [];
        currentBreakFastCalories = 0;
        currentBreakFastMenu = breakfastMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isBreakFastMenuAdded = true;
        currentSnack1Menu = [];
        currentSnack1Calories = 0;
        currentSnack1Menu = snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isSnack1MenuAdded = true;
        currentLunchMenu = [];
        currentLunchCalories = 0;
        currentLunchMenu = lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isLunchMenuAdded = true;
        updateConsumedCalories();
        pieData = getPieChartData();
        countStartDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(18, 0, 0, 0)) : new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(18, 0, 0, 0));
        countStartDateMonth = countStartDate.getMonth();
        currentDateMonth = new Date().getMonth();
        if(countStartDateMonth == currentDateMonth) {
            countDownDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(countStartDate.getHours() + 16, 0, 0, 0)) : new Date(new Date(new Date().setDate(countStartDate.getDate())).setHours(countStartDate.getHours() + 16, 0, 0, 0));
        }
        else {
            countDownDate = new Date(new Date().setHours(10, 0, 0, 0));
        }
        x = setInterval(intervalFn, 1000);
        getInitialData();
    }

    function getWeightChartData() {
        let count = 12;
        let sampleData = [];
        for (let i = count - 1; i >= 0; i--) {
            let date = (currentDate) ? new Date(currentDate) : new Date();
            let data = {
                x: new Date(date.setMonth(date.getMonth() - i)),
                y: Math.round(70 + (i * (Math.random() * (3.5 - 2) + 2)))
            };
            sampleData.push(data);
        }
        return sampleData;
    }

    function getChartData(action, value) {
        let count = (value && value === 'Monthly') ? 30 : 7;
        let sampleData = [];
        for (let i = count - 1; i >= 0; i--) {
            let date = (currentDate) ? new Date(currentDate) : new Date();
            let data = {
                x: new Date(new Date(date.setDate(date.getDate() - i)).setHours(0, 0, 0, 0)),
                y: Number((Math.random() * (90 - 50) + 50).toFixed(2).replace(/[.,]00$/, ""))
            };
            sampleData.push(data);
            if (i == 0) {
                todaysWorkoutPercent = data['y'];
            }
        }
        return sampleData;
    }

    function getSleepInHours(minutes) {
        return Math.floor(minutes / 60) + 'h' + ' ' + (minutes % 60) + 'm';
    }

    function onDateChange(args) {
            currentDate = args.value;
            updateComponents();
    }

    function updateConsumedCalories() {
        currentTotalProteins = 0;
        currentTotalFat = 0;
        currentTotalCarbs = 0;
        currentTotalCalcium = 0;
        currentTotalIron = 0;
        currentTotalSodium = 0;
        consumedCalories = 0;
        currentBreakFastMenu = currentBreakFastMenu.length > 0 ? currentBreakFastMenu : state.currentBreakFastMenu;
        currentSnack1Menu = currentSnack1Menu.length > 0 ? currentSnack1Menu : state.currentSnack1Menu;
        currentLunchMenu = currentLunchMenu.length > 0 ? currentLunchMenu : state.currentLunchMenu;
        isBreakFastMenuAdded = state.isBreakFastMenuAdded;
        isSnack1MenuAdded = state.isSnack1MenuAdded;
        isLunchMenuAdded = state.isLunchMenuAdded;
        if (state.isSnack2MenuAdded) {
            currentSnack2Menu = currentSnack2Menu.length > 0 ? currentSnack2Menu : state.currentSnack2Menu;
            isSnack2MenuAdded = state.isSnack2MenuAdded;
        }
        if (state.isDinnerMenuAdded) {
            currentDinnerMenu = currentDinnerMenu.length > 0 ? currentDinnerMenu : state.currentDinnerMenu;
            isDinnerMenuAdded = state.isDinnerMenuAdded;
        }
        if (isBreakFastMenuAdded) {
            currentBreakFastMenuText = currentBreakFastMenu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentBreakFastMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentBreakFastMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentBreakFastMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentBreakFastMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentBreakFastMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentBreakFastMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentBreakFastCalories = 0;
            for (var i = 0; i < currentBreakFastMenu.length; i++) {
                if (currentBreakFastMenu[i].quantity) {
                    currentBreakFastCalories += (currentBreakFastMenu[i].cal * currentBreakFastMenu[i].quantity);
                }
                else {
                    currentBreakFastCalories += (currentBreakFastMenu[i].cal * 1);
                }
            }
            consumedCalories += currentBreakFastCalories;
        }
        if (isSnack1MenuAdded) {
            currentSnack1MenuText = currentSnack1Menu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentSnack1Menu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentSnack1Menu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentSnack1Menu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentSnack1Menu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentSnack1Menu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentSnack1Menu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentSnack1Calories = 0;
            for (var i = 0; i < currentSnack1Menu.length; i++) {
                if (currentSnack1Menu[i].quantity) {
                    currentSnack1Calories += (currentSnack1Menu[i].cal * currentSnack1Menu[i].quantity);
                }
                else {
                    currentSnack1Calories += (currentSnack1Menu[i].cal * 1);
                }
            }
            consumedCalories += currentSnack1Calories;
        }
        if (isLunchMenuAdded) {
            currentLunchMenuText = currentLunchMenu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentLunchMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentLunchMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentLunchMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentLunchMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentLunchMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentLunchMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentLunchCalories = 0;
            for (var i = 0; i < currentLunchMenu.length; i++) {
                if (currentLunchMenu[i].quantity) {
                    currentLunchCalories += (currentLunchMenu[i].cal * currentLunchMenu[i].quantity);
                }
                else {
                    currentLunchCalories += (currentLunchMenu[i].cal * 1);
                }
            }
            consumedCalories += currentLunchCalories;
        }
        if (isSnack2MenuAdded) {
            currentSnack2MenuText = currentSnack2Menu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentSnack2Menu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentSnack2Menu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentSnack2Menu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentSnack2Menu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentSnack2Menu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentSnack2Menu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentSnack2Calories = 0;
            for (var i = 0; i < currentSnack2Menu.length; i++) {
                if (currentSnack2Menu[i].quantity) {
                    currentSnack2Calories += (currentSnack2Menu[i].cal * currentSnack2Menu[i].quantity);
                }
                else {
                    currentSnack2Calories += (currentSnack2Menu[i].cal * 1);
                }
            }
            consumedCalories += currentSnack2Calories;
        }
        if (isDinnerMenuAdded) {
            currentDinnerMenuText = currentDinnerMenu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentDinnerMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentDinnerMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentDinnerMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentDinnerMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentDinnerMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentDinnerMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentDinnerCalories = 0;
            for (var i = 0; i < currentDinnerMenu.length; i++) {
                if (currentDinnerMenu[i].quantity) {
                    currentDinnerCalories += (currentDinnerMenu[i].cal * currentDinnerMenu[i].quantity);
                }
                else {
                    currentDinnerCalories += (currentDinnerMenu[i].cal * 1);
                }
            }
            consumedCalories += currentDinnerCalories;
        }
    }

    function getInitialData() {
        let data;
        let activities = [];
        if (masterData.length === 0) {
            let now = new Date();
            let isToday = countStartDate.toDateString() == now.toDateString();
            fastStartTime = (isToday ? 'Today ' : 'Yesterday ') + countStartDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            isToday = countDownDate.toDateString() == now.toDateString();
            fastEndTime = (isToday ? 'Today ' : 'Tomorrow ') + countDownDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            let breakWater = Math.round(Math.random() * (5 - 2) + 2);
            let lunchWater = Math.round(Math.random() * (5 - 2) + 2);
            let consumedCount = breakWater + lunchWater;
            let consumedAmount = consumedCount * 150;
            data = {
                date: state.currentDate.toLocaleDateString(),
                activity: {
                    heartRate: state.heartRate,
                    steps: state.steps,
                    sleepInMinutes: state.sleepInMinutes,
                    sleepInHours: getSleepInHours(sleepInMinutes),
                    currentDropDownData: state.currentDropDownData,
                    gridData: JSON.parse(JSON.stringify(state.gridData)),
                    activityChartWeeklyDietData: JSON.parse(JSON.stringify(state.activityChartWeeklyDietData)),
                    activityChartWeeklyWorkoutData: JSON.parse(JSON.stringify(state.activityChartWeeklyWorkoutData)),
                    activityChartMonthDietData : JSON.parse(JSON.stringify(state.activityChartMonthDietData)),
                    activityChartMonthWorkoutData : JSON.parse(JSON.stringify(state.activityChartMonthWorkoutData)),
                    morningWalk: state.morningWalk,
                    isToday: true,
                },
                diet: {
                    pieData: pieData,
                    expectedCalories: state.expectedCalories,
                    breakFastMenu: JSON.parse(JSON.stringify(currentBreakFastMenu)),
                    breakFastCalories: currentBreakFastCalories,
                    breakFastText: currentBreakFastMenuText,
                    isBreakFastMenuAdded: isBreakFastMenuAdded,
                    snack1Menu: JSON.parse(JSON.stringify(currentSnack1Menu)),
                    snack1Calories: currentSnack1Calories,
                    snack1Text: currentSnack1MenuText,
                    isSnack1Added: isSnack1MenuAdded,
                    lunchMenu: JSON.parse(JSON.stringify(currentLunchMenu)),
                    lunchCalories: currentLunchCalories,
                    lunchText: currentLunchMenuText,
                    isLunchAdded: isLunchMenuAdded,
                    dinnerMenu: JSON.parse(JSON.stringify(currentDinnerMenu)),
                    dinnerCalories: currentDinnerCalories,
                    dinnerText: currentDinnerMenuText,
                    isDinnerMenuAdded: isDinnerMenuAdded,
                    snack2Menu: JSON.parse(JSON.stringify(currentSnack2Menu)),
                    snack2Calories: currentSnack2Calories,
                    snack2Text: currentSnack2MenuText,
                    isSnack2MenuAdded: isSnack2MenuAdded,
                    consumedCalories: consumedCalories,
                    burnedCalories: state.burnedCalories,
                    breakfastWaterTaken: breakWater,
                    expectedWaterAmount: state.expectedWaterAmount,
                    lunchWaterTaken: lunchWater,
                    proteins: currentTotalProteins,
                    fat: currentTotalFat,
                    carbs: currentTotalCarbs,
                    calcium: currentTotalCalcium,
                    sodium: currentTotalSodium,
                    iron: currentTotalIron,
                },
                fasting: {
                    consumedWaterCount: consumedCount,
                    consumedWaterAmount: consumedAmount,
                    fastStartTime: fastStartTime,
                    fastEndTime: fastEndTime,
                    countStartDate: countStartDate,
                    countDownDate: countDownDate,
                    weightChartData: state.weightChartData
                }
            };
            masterData.push(data);
            activities = [
                { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' },
                { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' },
                { name: 'Breakfast', activity: 'Breakfast', amount: data.diet.breakFastText, percentage: ((data.diet.breakFastCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
                { name: 'Snack1', activity: 'Snack', amount: data.diet.snack1Text, percentage: ((data.diet.snack1Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
                { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
                { name: 'Lunch', activity: 'Lunch', amount: data.diet.lunchText, percentage: ((data.diet.lunchCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
            ];
        } else {
            countStartDate = masterData[0].fasting.countStartDate;
            countDownDate = masterData[0].fasting.countDownDate;
            fastStartTime = masterData[0].fasting.fastStartTime;
            fastEndTime = masterData[0].fasting.fastEndTime;
            isFastEnd = false;
            clearInterval(x);
            x = setInterval(intervalFn, 1000);
            data = masterData[0];
            let actValue;
            let updateActivities = [
                { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' },
                { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' },
                { name: 'Breakfast', activity: 'Breakfast', amount: data.diet.breakFastText, percentage: ((data.diet.breakFastCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
                { name: 'Snack1', activity: 'Snack', amount: data.diet.snack1Text, percentage: ((currentSnack1Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
                { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
                { name: 'Lunch', activity: 'Lunch', amount: data.diet.lunchText, percentage: ((data.diet.lunchCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
                { name: 'Snack2', activity: 'Snack', amount: data.diet.snack2Text, percentage: ((data.diet.snack2Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '3:00 PM' },
                { name: 'Evening Water', activity: 'Water Taken', count: data.diet.eveningWaterTaken, amount: data.diet.eveningWaterTaken + ' Glasses', percentage: (((data.diet.eveningWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '4:00 PM' },
                { name: 'Evening Walk', activity: 'Evening Walk', duration: '30m', distance: (data.activity.eveningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.eveningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '5:30 PM' },
                { name: 'Dinner', activity: 'Dinner', amount: data.diet.dinnerText, percentage: ((data.diet.dinnerCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '8:00 PM' }
            ];
            activities =[
                { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' }
            ]
            if(data.diet.breakfastWaterTaken > 0) {
                actValue = { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' }
                activities.push(actValue);
            }
            if(data.diet.isBreakFastMenuAdded) {
                actValue = { name: 'Breakfast', activity: 'Breakfast', amount: data.diet.breakFastText, percentage: ((data.diet.breakFastCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
                activities.push(actValue);
            }
            if(data.diet.isSnack1Added) {
                actValue = { name: 'Snack1', activity: 'Snack', amount: data.diet.snack1Text, percentage: ((data.diet.snack1Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
                activities.push(actValue);
            }
            if(data.diet.lunchWaterTaken > 0) {
                actValue = { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
                activities.push(actValue);
            }
            if(data.diet.isLunchAdded) {
                actValue = { name: 'Lunch', activity: 'Lunch', amount: data.diet.lunchText, percentage: ((data.diet.lunchCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
                activities.push(actValue);
            }
            if(data.diet.isSnack2MenuAdded) {
                actValue = { name: 'Snack2', activity: 'Snack', amount: data.diet.snack2Text, percentage: ((data.diet.snack2Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '3:00 PM' },
                activities.push(actValue);
            }
            if(data.diet.eveningWaterTaken) {
                actValue = { name: 'Evening Water', activity: 'Water Taken', count: data.diet.eveningWaterTaken, amount: data.diet.eveningWaterTaken + ' Glasses', percentage: (((data.diet.eveningWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '4:00 PM' },
                activities.push(actValue);
            }
            if(data.activity.eveningWalk ) {
                actValue = { name: 'Evening Walk', activity: 'Evening Walk', duration: '30m', distance: (data.activity.eveningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.eveningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '5:30 PM' },
                activities.push(actValue);
            }
            if(data.diet.isDinnerMenuAdded) {
                actValue = { name: 'Dinner', activity: 'Dinner', amount: data.diet.dinnerText, percentage: ((data.diet.dinnerCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '8:00 PM' }
                activities.push(actValue);
            }  
        }
        let SmallDevice = false;
        if (innerWidth <= 820) {
            SmallDevice = true;
        }
        let percent = Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100);
        let closetIndex = closestIndex(percent);
        let content = ['Poor', 'Good', 'Almost', 'Perfect!'];
        waterGaugeAnnotation[closetIndex].content = '<div class="e-water-annotation-text e-highlight-text">' + content[closetIndex] + '</div>'
        let waterCalculatedGaugeAxes = [
            {
                minimum: 0,
                maximum: 100,
                line: {
                    width: 0,
                },
                labelStyle: {
                    font: {
                        opacity: 0,
                    },
                },
                majorTicks: {
                    interval: 10,
                    color: '#3993F5',
                    offset: 5,
                },
                minorTicks: {
                    interval: 2,
                    color: '#3993F5',
                    offset: 5,
                },
                opposedPosition: true,
                pointers: [
                    {
                        value: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100),
                        height: 50,
                        width: 50,
                        roundedCornerRadius: 35,
                        type: 'Bar',
                        color: '#61a9f7',
                    },
                    {
                        value: 8,
                        width: 5,
                        height: 5,
                        offset: -60,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 8 ? 1 : 0
                    },
                    {
                        value: 15,
                        width: 4,
                        height: 4,
                        offset: -80,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 15 ? 1 : 0
                    },
                    {
                        value: 21,
                        width: 7,
                        height: 7,
                        offset: -75,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 21 ? 1 : 0
                    },
                    {
                        value: 27,
                        width: 8,
                        height: 8,
                        offset: -65,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 27 ? 1 : 0
                    },
                    {
                        value: 37,
                        width: 4,
                        height: 4,
                        offset: isDevice ? -85 : -55,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 37 ? 1 : 0
                    },
                    {
                        value: 42,
                        width: 6,
                        height: 6,
                        offset: -75,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 42 ? 1 : 0
                    },
                    {
                        value: 48,
                        width: 8,
                        height: 8,
                        offset: isDevice ? -80 : -58,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 48 ? 1 : 0
                    },
                    {
                        value: 56,
                        width: 5,
                        height: 5,
                        offset: -72,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 56 ? 1 : 0
                    },
                    {
                        value: 64,
                        width: 6,
                        height: 6,
                        offset: -79,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 64 ? 1 : 0
                    },
                    {
                        value: 72,
                        width: 8,
                        height: 8,
                        offset: isDevice ? -85 : -55,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 72 ? 1 : 0
                    },
                    {
                        value: 80,
                        width: 5,
                        height: 5,
                        offset: -70,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 80 ? 1 : 0
                    },
                    {
                        value: 86,
                        width: 6,
                        height: 6,
                        offset: -77,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 86 ? 1 : 0
                    },
                    {
                        value: 94,
                        width: 8,
                        height: 8,
                        offset: isDevice ? -80 : -54,
                        markerType: 'Circle',
                        color: '#87CEFA',
                        opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 94 ? 1 : 0
                    },
                ],
            },
        ];
        setState((prevState) => {
            return {
                ...prevState,
                heartRate: data.activity.heartRate,
                steps: data.activity.steps,
                consumedCalories: data.diet.consumedCalories,
                sleepInMinutes: data.activity.sleep,
                sleepInHours: getSleepInHours(data.activity.sleepInMinutes),
                currentDropDownData: data.activity.currentDropDownData,
                gridData: data.activity.gridData,
                activityChartWeeklyDietData: data.activity.activityChartWeeklyDietData,
                activityChartWeeklyWorkoutData: data.activity.activityChartWeeklyWorkoutData,
                activityChartMonthDietData : data.activity.activityChartMonthDietData,
                activityChartMonthWorkoutData : data.activity.activityChartMonthWorkoutData,
                morningWalk: data.activity.morningWalk,
                eveningWalk: data.activity.eveningWalk,
                breakfastWaterTaken: data.diet.breakfastWaterTaken,
                lunchWaterTaken: data.diet.lunchWaterTaken,
                expectedWaterAmount: data.diet.expectedWaterAmount,
                pieData: data.diet.pieData,
                expectedCalories: data.diet.expectedCalories,
                burnedCalories: data.diet.burnedCalories,
                todayActivities: activities,
                datePickerDate: currentDate,
                currentDate: currentDate,
                isSmallDevice: SmallDevice,
                currentBreakFastMenuText: data.diet.breakFastText,
                currentBreakFastCalories: data.diet.breakFastCalories,
                currentSnack1MenuText: data.diet.snack1Text,
                currentSnack1Calories: data.diet.snack1Calories,
                currentLunchMenuText: data.diet.lunchText,
                currentLunchCalories: data.diet.lunchCalories,
                currentSnack2MenuText: data.diet.snack2Text,
                currentSnack2Calories: data.diet.snack2Calories,
                currentDinnerMenuText: data.diet.dinnerText,
                currentDinnerCalories: data.diet.dinnerCalories,
                currentTotalProteins: data.diet.proteins,
                currentTotalFat: data.diet.fat,
                currentTotalCarbs: data.diet.carbs,
                currentTotalCalcium: data.diet.calcium,
                currentTotalSodium: data.diet.sodium,
                currentTotalIron: data.diet.iron,
                isBreakFastMenuAdded: data.diet.isBreakFastMenuAdded,
                isSnack1MenuAdded: data.diet.isSnack1Added,
                isLunchMenuAdded: data.diet.isLunchAdded,
                isDinnerMenuAdded: data.diet.isDinnerMenuAdded,
                isSnack2MenuAdded: data.diet.isSnack2MenuAdded,
                consumedWaterCount: data.fasting.consumedWaterCount,
                consumedWaterAmount: data.fasting.consumedWaterAmount,
                weightChartData: data.fasting.weightChartData,
                waterGaugeAxes: waterCalculatedGaugeAxes,
                fastStartTime: data.fasting.fastStartTime,
                fastEndTime: data.fasting.fastEndTime,
                countStartDate: data.fasting.countStartDate,
                countDownDate: data.fasting.countDownDate,
                circulargauge: circulargauge,
                waterGaugeAnnotation: waterGaugeAnnotation,
                currentBreakFastMenu: currentBreakFastMenu,
                currentSnack1Menu: currentSnack1Menu,
                currentSnack2Menu: currentSnack2Menu,
                currentLunchMenu: currentLunchMenu,
                currentDinnerMenu: currentDinnerMenu,
                isToday: data.activity.isToday,
                hidden: false
            }
        })
    }

    function updateComponents() {
        isToday = currentDate.getDate() === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
        if (!isToday) {
            let data;
            let isExist = false;
            let index = 0;
            for (let i = 0; i < masterData.length; i++) {
                if (masterData[i].date === currentDate.toLocaleDateString()) {
                    isExist = true;
                    index = i;
                    break;
                }
            }
            if (isExist) {
                data = masterData[index];
            } else {
                updateMenu();
                let breakfastWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
                let lunchWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
                let eveningWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
                let morningWalk = Math.round(Math.random() * (3000 - 1000) + 1000);
                let eveningWalk = Math.round(Math.random() * (3000 - 1000) + 1000);
                let sleepInMinutes = Math.round(Math.random() * (480 - 300) + 300);
                consumedWaterCount = breakfastWaterTaken + lunchWaterTaken + eveningWaterTaken;
                consumedWaterAmount = consumedWaterCount * 150;
                countStartDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(18, 0, 0, 0)) : new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(18, 0, 0, 0));
                countDownDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(countStartDate.getHours() + 16, 0, 0, 0)) : new Date(new Date(new Date().setDate(countStartDate.getDate())).setHours(countStartDate.getHours() + 16, 0, 0, 0));
                let now = new Date();
                let isToday = countStartDate.toDateString() == now.toDateString();
                fastStartTime = (isToday ? 'Today ' : 'Yesterday ') + countStartDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                isToday = countDownDate.toDateString() == now.toDateString();
                fastEndTime = (isToday ? 'Today ' : 'Tomorrow ') + countDownDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                data = {
                    date: currentDate.toLocaleDateString(),
                    activity: {
                        steps: morningWalk + eveningWalk,
                        heartRate: Math.round(Math.random() * (100 - 70) + 70),
                        sleepInMinutes: Math.round(Math.random() * (480 - 300) + 300),
                        sleepInHours: getSleepInHours(sleepInMinutes),
                        currentDropDownData: state.currentDropDownData,
                        gridData: getData(),
                        activityChartWeeklyDietData: getChartData('Diet', 'Weekly'),
                        activityChartWeeklyWorkoutData: getChartData('Workout', 'Weekly'),
                        activityChartMonthDietData : getChartData('Diet', 'Monthly'),
                        activityChartMonthWorkoutData : getChartData('Workout', 'Monthly'),
                        morningWalk: morningWalk,
                        eveningWalk: eveningWalk,
                        isToday: false,
                    },
                    diet: {
                        pieData: pieData,
                        breakFastMenu: JSON.parse(JSON.stringify(currentBreakFastMenu)),
                        breakFastCalories: currentBreakFastCalories,
                        expectedCalories: 3000,
                        breakFastText: currentBreakFastMenuText,
                        isBreakFastMenuAdded: isBreakFastMenuAdded,
                        snack1Menu: JSON.parse(JSON.stringify(currentSnack1Menu)),
                        snack1Calories: currentSnack1Calories,
                        snack1Text: currentSnack1MenuText,
                        isSnack1Added: isSnack1MenuAdded,
                        snack2Menu: JSON.parse(JSON.stringify(currentSnack2Menu)),
                        snack2Calories: currentSnack2Calories,
                        snack2Text: currentSnack2MenuText,
                        isSnack2Added: isSnack2MenuAdded,
                        lunchMenu: JSON.parse(JSON.stringify(currentLunchMenu)),
                        lunchCalories: currentLunchCalories,
                        lunchText: currentLunchMenuText,
                        isLunchAdded: isLunchMenuAdded,
                        dinnerMenu: JSON.parse(JSON.stringify(currentDinnerMenu)),
                        dinnerCalories: currentDinnerCalories,
                        dinnerText: currentDinnerMenuText,
                        isDinnerAdded: isDinnerMenuAdded,
                        consumedCalories: consumedCalories,
                        burnedCalories: burnedCalories,
                        breakfastWaterTaken: breakfastWaterTaken,
                        expectedWaterAmount: 2400,
                        lunchWaterTaken: lunchWaterTaken,
                        eveningWaterTaken: eveningWaterTaken,
                        proteins: currentTotalProteins,
                        fat: currentTotalFat,
                        carbs: currentTotalCarbs,
                        calcium: currentTotalCalcium,
                        sodium: currentTotalSodium,
                        iron: currentTotalIron,
                    },
                    fasting: {
                        consumedWaterCount: consumedWaterCount,
                        consumedWaterAmount: consumedWaterAmount,
                        countStartDate: countStartDate,
                        countDownDate: countDownDate,
                        fastStartTime: fastStartTime,
                        fastEndTime: fastEndTime,
                        weightChartData: getWeightChartData()
                    }
                };
                masterData.push(data);
            }
            endFasting();
            disableElements();
            let smallDevice = false;
            if (innerWidth <= 820) {
                smallDevice = true;
            }
            let percent = Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100);
            let closetIndex = closestIndex(percent);
            let content = ['Poor', 'Good', 'Almost', 'Perfect!'];
            waterGaugeAnnotation[closetIndex].content = '<div class="e-water-annotation-text e-highlight-text">' + content[closetIndex] + '</div>'
            let waterCalculatedGaugeAxes = [
                {
                    minimum: 0,
                    maximum: 100,
                    line: {
                        width: 0,
                    },
                    labelStyle: {
                        font: {
                            opacity: 0,
                        },
                    },
                    majorTicks: {
                        interval: 10,
                        color: '#3993F5',
                        offset: 5,
                    },
                    minorTicks: {
                        interval: 2,
                        color: '#3993F5',
                        offset: 5,
                    },
                    opposedPosition: true,
                    pointers: [
                        {
                            value: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100),
                            height: 50,
                            width: 50,
                            roundedCornerRadius: 35,
                            type: 'Bar',
                            color: '#61a9f7',
                        },
                        {
                            value: 8,
                            width: 5,
                            height: 5,
                            offset: -60,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 8 ? 1 : 0
                        },
                        {
                            value: 15,
                            width: 4,
                            height: 4,
                            offset: -80,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 15 ? 1 : 0
                        },
                        {
                            value: 21,
                            width: 7,
                            height: 7,
                            offset: -75,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 21 ? 1 : 0
                        },
                        {
                            value: 27,
                            width: 8,
                            height: 8,
                            offset: -65,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 27 ? 1 : 0
                        },
                        {
                            value: 37,
                            width: 4,
                            height: 4,
                            offset: isDevice ? -85 : -55,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 37 ? 1 : 0
                        },
                        {
                            value: 42,
                            width: 6,
                            height: 6,
                            offset: -75,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 42 ? 1 : 0
                        },
                        {
                            value: 48,
                            width: 8,
                            height: 8,
                            offset: isDevice ? -80 : -58,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 48 ? 1 : 0
                        },
                        {
                            value: 56,
                            width: 5,
                            height: 5,
                            offset: -72,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 56 ? 1 : 0
                        },
                        {
                            value: 64,
                            width: 6,
                            height: 6,
                            offset: -79,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 64 ? 1 : 0
                        },
                        {
                            value: 72,
                            width: 8,
                            height: 8,
                            offset: isDevice ? -85 : -55,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 72 ? 1 : 0
                        },
                        {
                            value: 80,
                            width: 5,
                            height: 5,
                            offset: -70,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 80 ? 1 : 0
                        },
                        {
                            value: 86,
                            width: 6,
                            height: 6,
                            offset: -77,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 86 ? 1 : 0
                        },
                        {
                            value: 94,
                            width: 8,
                            height: 8,
                            offset: isDevice ? -80 : -54,
                            markerType: 'Circle',
                            color: '#87CEFA',
                            opacity: Math.round((data.fasting.consumedWaterAmount / data.diet.expectedWaterAmount) * 100) > 94 ? 1 : 0
                        },
                    ],
                },
            ];
            let updateActivities = [
                { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' },
                { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' },
                { name: 'Breakfast', activity: 'Breakfast', amount: data.diet.breakFastText, percentage: ((data.diet.breakFastCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
                { name: 'Snack1', activity: 'Snack', amount: data.diet.snack1Text, percentage: ((currentSnack1Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
                { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
                { name: 'Lunch', activity: 'Lunch', amount: data.diet.lunchText, percentage: ((data.diet.lunchCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
                { name: 'Snack2', activity: 'Snack', amount: data.diet.snack2Text, percentage: ((data.diet.snack2Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '3:00 PM' },
                { name: 'Evening Water', activity: 'Water Taken', count: data.diet.eveningWaterTaken, amount: data.diet.eveningWaterTaken + ' Glasses', percentage: (((data.diet.eveningWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '4:00 PM' },
                { name: 'Evening Walk', activity: 'Evening Walk', duration: '30m', distance: (data.activity.eveningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.eveningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '5:30 PM' },
                { name: 'Dinner', activity: 'Dinner', amount: data.diet.dinnerText, percentage: ((data.diet.dinnerCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '8:00 PM' }
            ];
            setState((prevState) => {
                return {
                    ...prevState,
                    heartRate: data.activity.heartRate,
                    steps: data.activity.steps,
                    sleepInMinutes: data.activity.sleep,
                    sleepInHours: getSleepInHours(data.activity.sleepInMinutes),
                    currentDropDownData: data.activity.currentDropDownData,
                    gridData: data.activity.gridData,
                    activityChartWeeklyDietData: data.activity.activityChartWeeklyDietData,
                    activityChartWeeklyWorkoutData: data.activity.activityChartWeeklyWorkoutData,
                    activityChartMonthDietData : data.activity.activityChartMonthDietData,
                    activityChartMonthWorkoutData : data.activity.activityChartMonthWorkoutData,
                    consumedCalories: data.diet.consumedCalories,
                    morningWalk: data.activity.morningWalk,
                    eveningWalk: data.activity.eveningWalk,
                    pieData: data.diet.pieData,
                    breakfastWaterTaken: data.diet.breakfastWaterTaken,
                    lunchWaterTaken: data.diet.lunchWaterTaken,
                    eveningWaterTaken: data.diet.eveningWaterTaken,
                    expectedWaterAmount: data.diet.expectedWaterAmount,
                    todayActivities: updateActivities,
                    datePickerDate: currentDate,
                    currentDate: currentDate,
                    expectedCalories: data.diet.expectedCalories,
                    isSmallDevice: smallDevice,
                    currentBreakFastMenuText: data.diet.breakFastText,
                    currentBreakFastCalories: data.diet.breakFastCalories,
                    currentSnack1MenuText: data.diet.snack1Text,
                    currentSnack1Calories: data.diet.snack1Calories,
                    currentLunchMenuText: data.diet.lunchText,
                    currentLunchCalories: data.diet.lunchCalories,
                    currentSnack2MenuText: data.diet.snack2Text,
                    currentSnack2Calories: data.diet.snack2Calories,
                    currentDinnerMenuText: data.diet.dinnerText,
                    currentDinnerCalories: data.diet.dinnerCalories,
                    currentTotalProteins: data.diet.proteins,
                    currentTotalFat: data.diet.fat,
                    currentTotalCarbs: data.diet.carbs,
                    currentTotalCalcium: data.diet.calcium,
                    currentTotalSodium: data.diet.sodium,
                    currentTotalIron: data.diet.iron,
                    burnedCalories: data.diet.burnedCalories,
                    isBreakFastMenuAdded: data.diet.isBreakFastMenuAdded,
                    isSnack1MenuAdded: data.diet.isSnack1Added,
                    isLunchMenuAdded: data.diet.isLunchAdded,
                    isDinnerMenuAdded: data.diet.isDinnerAdded,
                    isSnack2MenuAdded: data.diet.isSnack2Added,
                    consumedWaterCount: data.fasting.consumedWaterCount,
                    consumedWaterAmount: data.fasting.consumedWaterAmount,
                    weightChartData: data.fasting.weightChartData,
                    waterGaugeAxes: waterCalculatedGaugeAxes,
                    fastStartTime: data.fasting.fastStartTime,
                    fastEndTime: data.fasting.fastEndTime,
                    circulargauge: circulargauge,
                    countStartDate: data.fasting.countStartDate,
                    countDownDate: data.fasting.countDownDate,
                    currentBreakFastMenu: currentBreakFastMenu,
                    currentSnack1Menu: currentSnack1Menu,
                    currentSnack2Menu: currentSnack2Menu,
                    currentLunchMenu: currentLunchMenu,
                    currentDinnerMenu: currentDinnerMenu,
                    waterGaugeAnnotation: waterGaugeAnnotation,
                    isToday: data.activity.isToday,
                    hidden: false
                }
            })
        } else {
            consumedCalories = 0;
            isBreakFastMenuAdded = false;
            isSnack1MenuAdded = false;
            isLunchMenuAdded = false;
            isSnack2MenuAdded = false;
            isDinnerMenuAdded = false;
            pieData = getPieChartData();
            getInitialData();
        }
    }

    function disableElements() {
        if (!isToday) {
            if (document.querySelector('.e-fast-time-btn')) {
                (document.querySelector('.e-fast-time-btn')).style.pointerEvents = 'none';
            }
            if (document.querySelector('.e-fast-end-btn')) {
                (document.querySelector('.e-fast-end-btn')).style.pointerEvents = 'none';
            }
            if (document.querySelector('.e-water-minus')) {
                (document.querySelector('.e-water-minus')).style.pointerEvents = 'none';
            }
            if (document.querySelector('.e-water-plus')) {
                (document.querySelector('.e-water-plus')).style.pointerEvents = 'none';
            }
            if (document.getElementsByClassName('e-circulargauge')[0]) {
                endFasting();
            }
        } else {
            if (document.querySelector('.e-fast-time-btn')) {
                (document.querySelector('.e-fast-time-btn')).style.pointerEvents = '';
            }
            if (document.querySelector('.e-fast-end-btn')) {
                (document.querySelector('.e-fast-end-btn')).style.pointerEvents = 'auto';
            }
            if (document.querySelector('.e-water-minus')) {
                (document.querySelector('.e-water-minus')).style.pointerEvents = 'auto';
            }
            if (document.querySelector('.e-water-plus')) {
                (document.querySelector('.e-water-plus')).style.pointerEvents = 'auto';
            }
        }
    }

    function updateMenu() {
        currentBreakFastMenu = [];
        currentBreakFastCalories = 0;
        currentBreakFastMenu = breakfastMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isBreakFastMenuAdded = true;
        currentSnack1Menu = [];
        currentSnack1Calories = 0;
        currentSnack1Menu = snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isSnack1MenuAdded = true;
        currentLunchMenu = [];
        currentLunchCalories = 0;
        currentLunchMenu = lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isLunchMenuAdded = true;
        currentSnack2Menu = [];
        currentSnack2Calories = 0;
        currentSnack2Menu = snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isSnack2MenuAdded = true;
        currentDinnerMenu = [];
        currentDinnerCalories = 0;
        currentDinnerMenu = lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isDinnerMenuAdded = true;
        updateConsumedCalories();
        pieData = getPieChartData();
    }

    function intervalFn() {
        let now = new Date();
        let isToday = countStartDate.toDateString() == now.toDateString();
        fastStartTime = (isToday ? 'Today ' : 'Yesterday ') + countStartDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        isToday = countDownDate.toDateString() == now.toDateString();
        fastEndTime = (isToday ? 'Today ' : 'Tomorrow ') + countDownDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        let percent = Math.round(((now - countStartDate) / (countDownDate - countStartDate)) * 100);
        percent = percent > 100 ? 100 : percent;
        let left = countDownDate.getTime() - now.getTime();
        let leftHours = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        leftHours = leftHours < 0 ? 0 : leftHours;
        let leftMinutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
        leftMinutes = leftMinutes < 0 ? 0 : leftMinutes;
        let distance = now.getTime() - countStartDate.getTime();
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        sliderValue = hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + " : " + minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + " : " + seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        let fastingGauge = document.getElementById('range-container') ? document.getElementById('range-container').ej2_instances[0] : undefined;
        if (distance > (countDownDate.getTime() - countStartDate.getTime()) || distance < 0 || isFastEnd) {
            endFasting();
        } else if (fastingGauge) {
            fastingGauge.axes[0].ranges[1].end = percent;
            fastingGauge.axes[0].annotations[1].angle = Math.round((percent / 100) * 340) + 10;
            if (percent > 80) {
                fastingGauge.axes[0].annotations[1].content = '<div class="e-gauge-percent-img icon-Calories"></div>';
            } else {
                fastingGauge.axes[0].annotations[1].content = '';
            }
            fastingGauge.axes[0].annotations[0].content = '<div class="e-fast-ellapsed">Elapsed Time (' + percent + '%)</div><div class="e-fast-completed">' +
                sliderValue.toString() + '</div><div class="e-fast-left">Left ' + leftHours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + 'h ' + leftMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + 'm</div>';
            fastingGauge.refresh();
            circulargauge = fastingGauge.axes;
        }
    }
    function endFasting() {
        isFastEnd = true;
        clearInterval(x);
        sliderValue = "Completed";
        changeTimeBtnText = "START FASTING";
        let fastingGauge = document.getElementById('range-container') ? document.getElementById('range-container').ej2_instances[0] : undefined;
        if (fastingGauge) {
            let percent = 100;
            fastingGauge.axes[0].ranges[1].end = percent;
            fastingGauge.axes[0].annotations[1].angle = Math.round((percent / 100) * 340) + 10;
            fastingGauge.axes[0].annotations[1].content = '<div class="e-gauge-percent-img icon-Calories"></div>';
            fastingGauge.axes[0].annotations[0].content = '<div class="e-fast-ellapsed">Elapsed Time (100%)</div><div class="e-fast-completed">' + sliderValue.toString() + '</div><div class="e-fast-left">Left 00h 00m</div>';
            circulargauge = fastingGauge.axes;
        }
        else {
            let percent = 100;
            circulargauge[0].ranges[1].end = percent;
            circulargauge[0].annotations[1].angle = Math.round((percent / 100) * 340) + 10;
            circulargauge[0].annotations[1].content = '<div class="e-gauge-percent-img icon-Calories"></div>';
            circulargauge[0].annotations[0].content = '<div class="e-fast-ellapsed">Elapsed Time (100%)</div><div class="e-fast-completed">' + sliderValue.toString() + '</div><div class="e-fast-left">Left 00h 00m</div>';
        }
    }

    function customiseCell(args) {
        if (args.column.field === 'Completion') {
            args.cell.classList.add('completion-color');
        }
    }

    function getPieChartData() {
        return [{ x: 'PROTEINS', y: currentTotalProteins, fill: '#4DD291' }, { x: 'FAT', y: currentTotalFat, fill: '#FC892C' },
        { x: 'CARBOHYDRATES', y: currentTotalCarbs, fill: '#FFC147' }, { x: 'CALCIUM', y: currentTotalCalcium, fill: '#E25641' },
        { x: 'SODIUM', y: currentTotalSodium, fill: '#901C53' }, { x: 'IRON', y: currentTotalIron, fill: '#CB4967' }];
    }

    function getData() {
        let workout = ['Running', 'Swimming', 'Walking', 'Yoga'];
        let average = [10, 18, 22];
        let hours = [8, 7, 6, 6];
        let minutes = [0, 0, 30, 0];
        let caloriesBurned = [10, 15, 30];
        let count = 1;
        burnedCalories = 0;
        let date = (currentDate) ? new Date(currentDate) : new Date();
        let sampleData = [];
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < workout.length; j++) {
                let time = new Date(new Date(date.setHours(hours[j])).setMinutes(minutes[j]));
                let distance = workout[j] === 'Yoga' ? '' : workout[j] === 'Running' ? Math.random() * (5 - 1) + 1 : Math.random() * (2 - 1) + 1;
                let data = {
                    Workout: workout[j],
                    Distance: distance,
                    Duration: workout[j] === 'Yoga' ? Math.random() * (30 - 10) + 10 : ((distance) * average[j]),
                    Date: time,
                    Completion: Math.random() * (30 - 10) + 10
                };
                sampleData.push(data);
                burnedCalories += workout[j] === 'Yoga' ? 0 : Math.round((data['Duration'] / caloriesBurned[j]) * 100);
            }
        }
        return sampleData;
    }

    function onDropDownChange(args) {
        currentDate = state.currentDate;
        let dropvalue = [];
        if (args.value == 'Monthly') {
            dropvalue = ['Monthly', 'Weekly'];
        }
        else {
            dropvalue = ['Weekly', 'Monthly'];
        }
        let dropIndex;
        for (let i = 0; i < masterData.length; i++) {
            if (masterData[i].date === currentDate.toLocaleDateString()) {
                dropIndex = i;
                break;
            }
        }
        setState(prevState => {
            return {
                ...prevState,
                activityChartWeeklyDietData: masterData[dropIndex].activity.activityChartWeeklyDietData,
                activityChartWeeklyWorkoutData: masterData[dropIndex].activity.activityChartWeeklyWorkoutData,
                activityChartMonthDietData : masterData[dropIndex].activity.activityChartMonthDietData,
                activityChartMonthWorkoutData : masterData[dropIndex].activity.activityChartMonthWorkoutData,
                currentDropDownData: dropvalue,
                hidden: false
            }
        })
    }

    function legendClick(args) {
        if (args.legendText === 'Diet') {
            this.series[2].visible = !this.series[2].visible;
        } else if (args.legendText === 'Workout') {
            this.series[3].visible = !this.series[3].visible;
        }
    }

    function chartTooltipRender(args) {
        args.text.splice(2, 2);
    }

    function onProfileDateChange(args) {
            currentDate = args.value;
            updateComponents();
    }

    function minusClick() {
        let time = new Date().getHours();
        let period = (time > 0 && time < 8) ? 'Breakfast Water' : (time > 8 && time < 16) ? 'Lunch Water' : 'Evening Water';
        let ind;
        let activity;
        let todActivity = state.todayActivities;
        let consWaterCount = state.consumedWaterCount;
        let consWaterAmount = consWaterCount * 150;
        let expectWaterAmount = state.expectedWaterAmount;
        let minuspercent = Math.round((consWaterAmount / expectWaterAmount) * 100);
        let minusclosetIndex = closestIndex(minuspercent);
        let content = ['Poor', 'Good', 'Almost', 'Perfect!'];
        let waterAnnotation = state.waterGaugeAnnotation;
        let waterAxes = state.waterGaugeAxes;
        for (let i = 0; i < todActivity.length; i++) {
            if (todActivity[i].name === period) {
                ind = i;
                break;
            }
        }
        if (ind && state.consumedWaterCount > 0) {
            consWaterCount = state.consumedWaterCount > 0 ? state.consumedWaterCount - 1 : 0;
            consWaterAmount = consWaterCount * 150;
            expectWaterAmount = state.expectedWaterAmount;
            minuspercent = Math.round((consWaterAmount / expectWaterAmount) * 100);
            minusclosetIndex = closestIndex(minuspercent);
            content = ['Poor', 'Good', 'Almost', 'Perfect!'];
            waterAnnotation = state.waterGaugeAnnotation;
            waterAxes = state.waterGaugeAxes;
            if (todActivity[ind].count > 1) {
                activity = { name: period, activity: 'Water Taken', count: (todActivity[ind].count - 1), amount: (todActivity[ind].count - 1) + ' Glasses', percentage: ((((todActivity[ind].count - 1) * 150) / expectWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: todActivity[ind].time };
                todActivity[ind] = activity;
            } else {
                todActivity.splice(ind, 1);
            }
            waterAnnotation[minusclosetIndex].content = '<div class="e-water-annotation-text e-highlight-text">' + content[minusclosetIndex] + '</div>'
            if (content[minusclosetIndex + 1]) {
                waterAnnotation[minusclosetIndex + 1].content = '<div class="e-water-annotation-text">' + content[minusclosetIndex + 1] + '</div>';
            }
            let pointers = [
                {
                    value: Math.round((consWaterAmount / expectWaterAmount) * 100),
                    height: 50,
                    width: 50,
                    roundedCornerRadius: 35,
                    type: 'Bar',
                    color: '#61a9f7',
                },
                {
                    value: 8,
                    width: 5,
                    height: 5,
                    offset: -60,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 8 ? 1 : 0
                },
                {
                    value: 15,
                    width: 4,
                    height: 4,
                    offset: -80,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 15 ? 1 : 0
                },
                {
                    value: 21,
                    width: 7,
                    height: 7,
                    offset: -75,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 21 ? 1 : 0
                },
                {
                    value: 27,
                    width: 8,
                    height: 8,
                    offset: -65,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 27 ? 1 : 0
                },
                {
                    value: 37,
                    width: 4,
                    height: 4,
                    offset: isDevice ? -85 : -55,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 37 ? 1 : 0
                },
                {
                    value: 42,
                    width: 6,
                    height: 6,
                    offset: -75,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 42 ? 1 : 0
                },
                {
                    value: 48,
                    width: 8,
                    height: 8,
                    offset: isDevice ? -80 : -58,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 48 ? 1 : 0
                },
                {
                    value: 56,
                    width: 5,
                    height: 5,
                    offset: -72,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 56 ? 1 : 0
                },
                {
                    value: 64,
                    width: 6,
                    height: 6,
                    offset: -79,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 64 ? 1 : 0
                },
                {
                    value: 72,
                    width: 8,
                    height: 8,
                    offset: isDevice ? -85 : -55,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 72 ? 1 : 0
                },
                {
                    value: 80,
                    width: 5,
                    height: 5,
                    offset: -70,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 80 ? 1 : 0
                },
                {
                    value: 86,
                    width: 6,
                    height: 6,
                    offset: -77,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 86 ? 1 : 0
                },
                {
                    value: 94,
                    width: 8,
                    height: 8,
                    offset: isDevice ? -80 : -54,
                    markerType: 'Circle',
                    color: '#87CEFA',
                    opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 94 ? 1 : 0
                },
            ];
            waterAxes[0].pointers = pointers;
            setState(prevState => {
                return {
                    ...prevState,
                    todayActivities: todActivity,
                    consumedWaterCount: consWaterCount,
                    consumedWaterAmount: consWaterAmount,
                    waterGaugeAnnotation: waterAnnotation,
                    waterGaugeAxes: waterAxes,
                    hidden: false
                }
            })
        }
    }

    function plusClick() {
        let time = new Date().getHours();
        let period = (time > 0 && time < 8) ? 'Breakfast Water' : (time > 8 && time < 16) ? 'Lunch Water' : 'Evening Water';
        let index;
        let activity;
        let todActivity = state.todayActivities;
        let consWaterCount = state.consumedWaterCount + 1;
        let consWaterAmount = consWaterCount * 150;
        let expectWaterAmount = state.expectedWaterAmount;
        let percent = Math.round((consWaterAmount / expectWaterAmount) * 100);
        let closetIndex = closestIndex(percent);
        let content = ['Poor', 'Good', 'Almost', 'Perfect!'];
        let waterAnnotation = state.waterGaugeAnnotation;
        let waterAxes = state.waterGaugeAxes;
        for (let i = 0; i < todActivity.length; i++) {
            if (todActivity[i].name === period) {
                index = i;
                break;
            }
        }
        if (index) {
            activity = { name: period, activity: 'Water Taken', count: (todActivity[index].count + 1), amount: (todActivity[index].count + 1) + ' Glasses', percentage: ((((todActivity[index].count + 1) * 150) / state.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' }) };
            todActivity[index] = activity;
        } else {
            activity = { name: period, activity: 'Water Taken', count: 1, amount: 1 + ' Glasses', percentage: (((1 * 150) / state.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' }) };
            todActivity.push(activity);
        }
        waterAnnotation[closetIndex].content = '<div class="e-water-annotation-text e-highlight-text">' + content[closetIndex] + '</div>'
        for (let i = 0; i < content.length; i++) {
            if (i !== closetIndex) {
                waterAnnotation[i].content = '<div class="e-water-annotation-text">' + content[i] + '</div>';
            }
        }
        let pointers = [
            {
                value: Math.round((consWaterAmount / expectWaterAmount) * 100),
                height: 50,
                width: 50,
                roundedCornerRadius: 35,
                type: 'Bar',
                color: '#61a9f7',
            },
            {
                value: 8,
                width: 5,
                height: 5,
                offset: -60,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 8 ? 1 : 0
            },
            {
                value: 15,
                width: 4,
                height: 4,
                offset: -80,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 15 ? 1 : 0
            },
            {
                value: 21,
                width: 7,
                height: 7,
                offset: -75,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 21 ? 1 : 0
            },
            {
                value: 27,
                width: 8,
                height: 8,
                offset: -65,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 27 ? 1 : 0
            },
            {
                value: 37,
                width: 4,
                height: 4,
                offset: isDevice ? -85 : -55,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 37 ? 1 : 0
            },
            {
                value: 42,
                width: 6,
                height: 6,
                offset: -75,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 42 ? 1 : 0
            },
            {
                value: 48,
                width: 8,
                height: 8,
                offset: isDevice ? -80 : -58,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 48 ? 1 : 0
            },
            {
                value: 56,
                width: 5,
                height: 5,
                offset: -72,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 56 ? 1 : 0
            },
            {
                value: 64,
                width: 6,
                height: 6,
                offset: -79,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 64 ? 1 : 0
            },
            {
                value: 72,
                width: 8,
                height: 8,
                offset: isDevice ? -85 : -55,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 72 ? 1 : 0
            },
            {
                value: 80,
                width: 5,
                height: 5,
                offset: -70,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 80 ? 1 : 0
            },
            {
                value: 86,
                width: 6,
                height: 6,
                offset: -77,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 86 ? 1 : 0
            },
            {
                value: 94,
                width: 8,
                height: 8,
                offset: isDevice ? -80 : -54,
                markerType: 'Circle',
                color: '#87CEFA',
                opacity: Math.round((consWaterAmount / expectWaterAmount) * 100) > 94 ? 1 : 0
            },
        ];
        waterAxes[0].pointers = pointers;
        if (state.consumedWaterCount < 20) {
            setState(prevState => {
                return {
                    ...prevState,
                    todayActivities: todActivity,
                    consumedWaterCount: consWaterCount,
                    consumedWaterAmount: consWaterAmount,
                    waterGaugeAnnotation: waterAnnotation,
                    waterGaugeAxes: waterAxes,
                    hidden: false
                }
            })
        }
    }

    function closestIndex(num) {
        let counts = [5, 40, 70, 95];
        var curr = counts[0],
            diff = Math.abs(num - curr),
            index = 0;
        for (var val = 0; val < counts.length; val++) {
            let newdiff = Math.abs(num - counts[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = counts[val];
                index = val;
            }
        }
        return index;
    }

    const headerPlacement = Browser.isDevice ? 'Bottom' : 'Top';
    const headerText = [{ 'text': 'ACTIVITIES', iconCss: 'icon-Activities', iconPosition: 'top' }, { 'text': 'DIET', iconCss: 'icon-Diet', iconPosition: 'top' }, { 'text': 'FASTING', iconCss: 'icon-Fasting', iconPosition: 'top' }, { 'text': 'PROFILE', iconCss: 'icon-Profile', iconPosition: 'top' }];
   
    function created() {
        let iconDiv = document.createElement('div');
        iconDiv.className = 'e-tab-header-icon-div';
        let iconSpan = document.createElement('span');
        iconSpan.className = 'e-tab-header-icon icon-Logo';
        iconDiv.appendChild(iconSpan);
        let titleDiv = document.createElement('div');
        titleDiv.className = 'e-tab-title';
        titleDiv.innerText = "GO";
        let titleSpan = document.createElement('span');
        titleSpan.innerText = "FIT";
        titleDiv.appendChild(titleSpan);
        let containerDiv = document.createElement('div');
        containerDiv.className = 'e-tab-header-icon-container';
        containerDiv.appendChild(iconDiv);
        containerDiv.appendChild(titleDiv);
        this.element.querySelector('.e-tab-header').prepend(containerDiv)
    }

    function tabSelecting(e) {
        if (e.isSwiped) {
            e.cancel = true;
        }
    }

    function tabSelected(e) {
        if (document.getElementsByClassName('e-chart')[0]) {
            document.getElementsByClassName('e-chart')[0].ej2_instances[0].refresh();
        }
        if (document.getElementsByClassName('e-accumulationchart')[0]) {
            document.getElementsByClassName('e-accumulationchart')[0].ej2_instances[0].refresh();
        }
        if (document.getElementsByClassName('e-circulargauge')[0]) {
            document.getElementsByClassName('e-circulargauge')[0].ej2_instances[0].refresh();
        }
        if (document.getElementsByClassName('e-lineargauge')[0]) {
            document.getElementsByClassName('e-lineargauge')[0].ej2_instances[0].refresh();
        }
        if (document.getElementsByClassName('e-fasting-chart')[0]) {
            document.getElementsByClassName('e-fasting-chart')[0].ej2_instances[0].refresh();
        }
    }

    function modifyFasting() {
        document.getElementsByClassName('e-add-fasting-dialog')[0].ej2_instances[0].show();
    }


    function fastingCancelBtnClick(args) {
        document.getElementsByClassName('e-add-fasting-dialog')[0].ej2_instances[0].hide();
    }

    let fasStartValue;
    let fasEndValue;

    function onFastStartDateChange() {
        fasStartValue = this.value;
    }

    function onFastEndDateChange() {
        fasEndValue = this.value;
    }

    function fastingDlgBtnClick(args) {
        isFastEnd = false;
        countStartDate = fasStartValue ? fasStartValue : state.countStartDate;
        countDownDate = fasEndValue ? fasEndValue : state.countDownDate;
        clearInterval(x);
        x = setInterval(intervalFn, 1000);
        let now = new Date();
        let isToday = countStartDate.toDateString() == now.toDateString();
        fastStartTime = (isToday ? 'Today ' : 'Yesterday ') + countStartDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        isToday = countDownDate.toDateString() == now.toDateString();
        fastEndTime = (isToday ? 'Today ' : 'Tomorrow ') + countDownDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        changeTimeBtnText = "CHANGE TIME";
        document.getElementsByClassName('e-add-fasting-dialog')[0].ej2_instances[0].hide();
        let masterDataExsist = false;
        let masterIndex;
        for (let i = 0; i < masterData.length; i++) {
            if (masterData[i].date === state.currentDate.toLocaleDateString()) {
                masterIndex = i;
                masterDataExsist = true;
            }
        }
        if(masterDataExsist) {
            masterData[masterIndex].fasting.fastStartTime = fastStartTime;
            masterData[masterIndex].fasting.fastEndTime = fastEndTime;
            masterData[masterIndex].fasting.countStartDate = countStartDate;
            masterData[masterIndex].fasting.countDownDate = countDownDate;  
        }
        setState(prevState => {
            return {
                ...prevState,
                fastStartTime: fastStartTime,
                fastEndTime: fastEndTime,
                countStartDate: countStartDate,
                countDownDate: countDownDate,
                circulargauge: circulargauge,
                changeTimeBtnText: changeTimeBtnText,
                hidden: false
            }
        })
    }

    function clearFasting() {
        if (document.querySelector('.e-fast-completed').innerText !== 'Completed') {
            clearInterval(x);
            sliderValue = "Completed";
            endFasting();
            setState(prevState => {
                return {
                    ...prevState,
                    circulargauge: circulargauge,
                    changeTimeBtnText: changeTimeBtnText,
                    hidden: false
                }
            })
        }
    }

    function fastingGaugeLoaded() {
        let now = new Date();
        countStartDate = state.countStartDate;
        countDownDate = state.countDownDate;
        let distance = now.getTime() - countStartDate.getTime();
        if (distance > (countDownDate.getTime() - countStartDate.getTime()) || distance < 0 || (document.querySelector('.e-fast-completed') && document.querySelector('.e-fast-completed').innerText === 'Completed')) {
            if (document.querySelector('.e-fast-time-btn') && !document.querySelector('.e-fast-time-btn').classList.contains('e-fast-reset')) {
                document.querySelector('.e-fast-time-btn').classList.add('e-fast-reset');
            }
            if (document.querySelector('.e-fast-end-btn') && !document.querySelector('.e-fast-end-btn').classList.contains('e-fast-reset')) {
                document.querySelector('.e-fast-end-btn').classList.add('e-fast-reset');
            }
            if (document.querySelector('.e-fast-time-btn')) {
                document.querySelector('.e-fast-time-btn').innerText = "START FASTING";
            }
        } else {
            if (document.querySelector('.e-fast-time-btn') && document.querySelector('.e-fast-time-btn').classList.contains('e-fast-reset')) {
                document.querySelector('.e-fast-time-btn').classList.remove('e-fast-reset');
            }
            if (document.querySelector('.e-fast-end-btn') && document.querySelector('.e-fast-end-btn').classList.contains('e-fast-reset')) {
                document.querySelector('.e-fast-end-btn').classList.remove('e-fast-reset');
            }
            if (document.querySelector('.e-fast-time-btn')) {
                document.querySelector('.e-fast-time-btn').innerText = "CHANGE TIME";
            }
        }
    }

    function menuCancelBtnClick() {
        menudialogInstance.hide();
        currentTotalCal = 0;
        lastSelectItem = '';
        currentQuantity = 1;
    }

    function menuDlgBtnClick() {
        let masterDataExsist = false;
        let masterIndex;
        for (let i = 0; i < masterData.length; i++) {
            if (masterData[i].date === state.currentDate.toLocaleDateString()) {
                masterIndex = i;
                masterDataExsist = true;
            }
        }
        let isExist = false;
        let menuTimePicker = document.getElementById('quantity-datepicker').ej2_instances[0];
        let todayActivities = state.todayActivities;
        if (state.currentAddedMenu === 'Breakfast') {
            currentBreakFastMenu = [];
            currentBreakFastCalories = 0;
            currentBreakFastMenu = currentMenu.filter(function (item) {
                return item.isAdded;
            });
            currentBreakFastMenuText = currentBreakFastMenu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentBreakFastCalories = currentTotalCal;
            if (currentBreakFastMenuText !== '') {
                isBreakFastMenuAdded = true;
            } else {
                isBreakFastMenuAdded = false;
            }
            let activity = { name: 'Breakfast', activity: 'Breakfast', amount: currentBreakFastMenuText, percentage: ((currentBreakFastCalories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
            for (let i = 0; i < todayActivities.length; i++) {
                if (todayActivities[i].name === 'Breakfast') {
                    if (currentBreakFastMenuText !== '') {
                        todayActivities[i] = activity;
                    } else {
                        todayActivities.splice(i, 1);
                    }
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                todayActivities.push(activity);
            }
            updateConsumedCalories();
            pieData = getPieChartData();
            menuCancelBtnClick();
            setState(prevState => {
                return {
                    ...prevState,
                    hidden: false,
                    currentBreakFastMenu: currentBreakFastMenu,
                    currentBreakFastMenuText: currentBreakFastMenuText,
                    currentBreakFastCalories: currentBreakFastCalories,
                    isBreakFastMenuAdded: isBreakFastMenuAdded,
                    todayActivities: todayActivities,
                    currentTotalProteins: currentTotalProteins,
                    currentTotalFat: currentTotalFat,
                    currentTotalCarbs: currentTotalCarbs,
                    currentTotalCalcium: currentTotalCalcium,
                    currentTotalIron: currentTotalIron,
                    currentTotalSodium: currentTotalSodium,
                    consumedCalories: consumedCalories,
                    pieData: pieData
                }
            })
            if (masterDataExsist) {
                masterData[masterIndex].diet.breakFastMenu = currentBreakFastMenu;
                masterData[masterIndex].diet.breakFastText = currentBreakFastMenuText;
                masterData[masterIndex].diet.breakFastCalories = currentBreakFastCalories;
                masterData[masterIndex].diet.isBreakFastMenuAdded = isBreakFastMenuAdded;
                masterData[masterIndex].diet.proteins = currentTotalProteins;
                masterData[masterIndex].diet.fat = currentTotalFat;
                masterData[masterIndex].diet.carbs = currentTotalCarbs;
                masterData[masterIndex].diet.calcium = currentTotalCalcium;
                masterData[masterIndex].diet.sodium = currentTotalSodium;
                masterData[masterIndex].diet.iron = currentTotalIron;
                masterData[masterIndex].diet.consumedCalories = consumedCalories;
                masterData[masterIndex].diet.pieData = pieData
            }
        } else if (state.currentAddedMenu === 'Snack 1') {
            currentSnack1Menu = [];
            currentSnack1Calories = 0;
            currentSnack1Menu = currentMenu.filter(function (item) {
                return item.isAdded;
            });
            currentSnack1MenuText = currentSnack1Menu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentSnack1Calories = currentTotalCal;
            if (currentSnack1MenuText !== '') {
                isSnack1MenuAdded = true;
            } else {
                isSnack1MenuAdded = false;
            }
            let activity = { name: 'Snack1', activity: 'Snack', amount: currentSnack1MenuText, percentage: ((currentSnack1Calories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
            for (let i = 0; i < todayActivities.length; i++) {
                if (todayActivities[i].name === 'Snack1') {
                    if (currentSnack1MenuText !== '') {
                        todayActivities[i] = activity;
                    } else {
                        todayActivities.splice(i, 1);
                    }
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                todayActivities.push(activity);
            }
            updateConsumedCalories();
            pieData = getPieChartData();
            menuCancelBtnClick();
            setState(prevState => {
                return {
                    ...prevState,
                    hidden: false,
                    currentSnack1Menu: currentSnack1Menu,
                    currentSnack1Calories: currentSnack1Calories,
                    currentSnack1MenuText: currentSnack1MenuText,
                    isSnack1MenuAdded: isSnack1MenuAdded,
                    todayActivities: todayActivities,
                    currentTotalProteins: currentTotalProteins,
                    currentTotalFat: currentTotalFat,
                    currentTotalCarbs: currentTotalCarbs,
                    currentTotalCalcium: currentTotalCalcium,
                    currentTotalIron: currentTotalIron,
                    currentTotalSodium: currentTotalSodium,
                    consumedCalories: consumedCalories,
                    pieData: pieData
                }
            })
            if (masterDataExsist) {
                masterData[masterIndex].diet.snack1Menu = currentSnack1Menu;
                masterData[masterIndex].diet.snack1Text = currentSnack1MenuText;
                masterData[masterIndex].diet.snack1Calories = currentSnack1Calories;
                masterData[masterIndex].diet.isSnack1MenuAdded = isSnack1MenuAdded;
                masterData[masterIndex].diet.proteins = currentTotalProteins;
                masterData[masterIndex].diet.fat = currentTotalFat;
                masterData[masterIndex].diet.carbs = currentTotalCarbs;
                masterData[masterIndex].diet.calcium = currentTotalCalcium;
                masterData[masterIndex].diet.sodium = currentTotalSodium;
                masterData[masterIndex].diet.iron = currentTotalIron;
                masterData[masterIndex].diet.consumedCalories = consumedCalories;
                masterData[masterIndex].diet.pieData = pieData
            }
        } else if (state.currentAddedMenu === 'Lunch') {
            currentLunchMenu = [];
            currentLunchCalories = 0;
            currentLunchMenu = currentMenu.filter(function (item) {
                return item.isAdded;
            });
            currentLunchMenuText = currentLunchMenu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentLunchCalories = currentTotalCal;
            if (currentLunchMenuText !== '') {
                isLunchMenuAdded = true;
            } else {
                isLunchMenuAdded = false;
            }
            let activity = { name: 'Lunch', activity: 'Lunch', amount: currentLunchMenuText, percentage: ((currentLunchCalories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
            for (let i = 0; i < todayActivities.length; i++) {
                if (todayActivities[i].name === 'Lunch') {
                    if (currentLunchMenuText !== '') {
                        todayActivities[i] = activity;
                    } else {
                        todayActivities.splice(i, 1);
                    }
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                todayActivities.push(activity);
            }
            updateConsumedCalories();
            pieData = getPieChartData();
            menuCancelBtnClick();
            setState(prevState => {
                return {
                    ...prevState,
                    hidden: false,
                    currentLunchMenu: currentLunchMenu,
                    currentLunchCalories: currentLunchCalories,
                    currentLunchMenuText: currentLunchMenuText,
                    isLunchMenuAdded: isLunchMenuAdded,
                    todayActivities: todayActivities,
                    currentTotalProteins: currentTotalProteins,
                    currentTotalFat: currentTotalFat,
                    currentTotalCarbs: currentTotalCarbs,
                    currentTotalCalcium: currentTotalCalcium,
                    currentTotalIron: currentTotalIron,
                    currentTotalSodium: currentTotalSodium,
                    consumedCalories: consumedCalories,
                    pieData: pieData
                }
            })
            if (masterDataExsist) {
                masterData[masterIndex].diet.lunchMenu = currentLunchMenu;
                masterData[masterIndex].diet.lunchText = currentLunchMenuText;
                masterData[masterIndex].diet.lunchCalories = currentLunchCalories;
                masterData[masterIndex].diet.isLunchAdded = isLunchMenuAdded;
                masterData[masterIndex].diet.proteins = currentTotalProteins;
                masterData[masterIndex].diet.fat = currentTotalFat;
                masterData[masterIndex].diet.carbs = currentTotalCarbs;
                masterData[masterIndex].diet.calcium = currentTotalCalcium;
                masterData[masterIndex].diet.sodium = currentTotalSodium;
                masterData[masterIndex].diet.iron = currentTotalIron;
                masterData[masterIndex].diet.consumedCalories = consumedCalories;
                masterData[masterIndex].diet.pieData = pieData
            }
        } else if (state.currentAddedMenu === 'Snack 2') {
            currentSnack2Menu = [];
            currentSnack2Calories = 0;
            currentSnack2Menu = currentMenu.filter(function (item) {
                return item.isAdded;
            });
            currentSnack2MenuText = currentSnack2Menu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentSnack2Calories = currentTotalCal;
            if (currentSnack2MenuText !== '') {
                isSnack2MenuAdded = true;
            } else {
                isSnack2MenuAdded = false;
            }
            let activity = { name: 'Snack2', activity: 'Snack', amount: currentSnack2MenuText, percentage: ((currentSnack2Calories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
            for (let i = 0; i < todayActivities.length; i++) {
                if (todayActivities[i].name === 'Snack2') {
                    if (currentSnack2MenuText !== '') {
                        todayActivities[i] = activity;
                    } else {
                        todayActivities.splice(i, 1);
                    }
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                todayActivities.push(activity);
            }
            updateConsumedCalories();
            pieData = getPieChartData();
            menuCancelBtnClick();
            setState(prevState => {
                return {
                    ...prevState,
                    hidden: false,
                    currentSnack2Menu: currentSnack2Menu,
                    currentSnack2Calories: currentSnack2Calories,
                    currentSnack2MenuText: currentSnack2MenuText,
                    isSnack2MenuAdded: isSnack2MenuAdded,
                    todayActivities: todayActivities,
                    currentTotalProteins: currentTotalProteins,
                    currentTotalFat: currentTotalFat,
                    currentTotalCarbs: currentTotalCarbs,
                    currentTotalCalcium: currentTotalCalcium,
                    currentTotalIron: currentTotalIron,
                    currentTotalSodium: currentTotalSodium,
                    consumedCalories: consumedCalories,
                    pieData: pieData
                }
            })
            if (masterDataExsist) {
                masterData[masterIndex].diet.snack2Menu = currentSnack2Menu;
                masterData[masterIndex].diet.snack2Text = currentSnack2MenuText;
                masterData[masterIndex].diet.snack2Calories = currentSnack2Calories;
                masterData[masterIndex].diet.isSnack2Added = isSnack2MenuAdded;
                masterData[masterIndex].diet.isSnack2MenuAdded = isSnack2MenuAdded;
                masterData[masterIndex].diet.proteins = currentTotalProteins;
                masterData[masterIndex].diet.fat = currentTotalFat;
                masterData[masterIndex].diet.carbs = currentTotalCarbs;
                masterData[masterIndex].diet.calcium = currentTotalCalcium;
                masterData[masterIndex].diet.sodium = currentTotalSodium;
                masterData[masterIndex].diet.iron = currentTotalIron;
                masterData[masterIndex].diet.consumedCalories = consumedCalories;
                masterData[masterIndex].diet.pieData = pieData
            }
        } else if (state.currentAddedMenu === 'Dinner') {
            currentDinnerMenu = [];
            currentDinnerCalories = 0;
            currentDinnerMenu = currentMenu.filter(function (item) {
                return item.isAdded;
            });
            currentDinnerMenuText = currentDinnerMenu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentDinnerCalories = currentTotalCal;
            if (currentDinnerMenuText !== '') {
                isDinnerMenuAdded = true;
            } else {
                isDinnerMenuAdded = false;
            }
            let activity = { name: 'Dinner', activity: 'Dinner', amount: currentDinnerMenuText, percentage: ((currentDinnerCalories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
            for (let i = 0; i < todayActivities.length; i++) {
                if (todayActivities[i].name === 'Dinner') {
                    if (currentDinnerMenuText !== '') {
                        todayActivities[i] = activity;
                    } else {
                        todayActivities.splice(i, 1);
                    }
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                todayActivities.push(activity);
            }
            updateConsumedCalories();
            pieData = getPieChartData();
            menuCancelBtnClick();
            setState(prevState => {
                return {
                    ...prevState,
                    hidden: false,
                    currentDinnerMenu: currentDinnerMenu,
                    currentDinnerCalories: currentDinnerCalories,
                    currentDinnerMenuText: currentDinnerMenuText,
                    isDinnerMenuAdded: isDinnerMenuAdded,
                    todayActivities: todayActivities,
                    currentTotalProteins: currentTotalProteins,
                    currentTotalFat: currentTotalFat,
                    currentTotalCarbs: currentTotalCarbs,
                    currentTotalCalcium: currentTotalCalcium,
                    currentTotalIron: currentTotalIron,
                    currentTotalSodium: currentTotalSodium,
                    consumedCalories: consumedCalories,
                    pieData: pieData
                }
            })
            if (masterDataExsist) {
                masterData[masterIndex].diet.dinnerMenu = currentDinnerMenu;
                masterData[masterIndex].diet.dinnerText = currentDinnerMenuText;
                masterData[masterIndex].diet.dinnerCalories = currentDinnerCalories;
                masterData[masterIndex].diet.isDinnerMenuAdded = isDinnerMenuAdded;
                masterData[masterIndex].diet.isDinnerAdded = isDinnerMenuAdded;
                masterData[masterIndex].diet.proteins = currentTotalProteins;
                masterData[masterIndex].diet.fat = currentTotalFat;
                masterData[masterIndex].diet.carbs = currentTotalCarbs;
                masterData[masterIndex].diet.calcium = currentTotalCalcium;
                masterData[masterIndex].diet.sodium = currentTotalSodium;
                masterData[masterIndex].diet.iron = currentTotalIron;
                masterData[masterIndex].diet.consumedCalories = consumedCalories;
                masterData[masterIndex].diet.pieData = pieData
            }
        }
    }

    function addBtnClick(args) {
        currentTotalCal = 0;
        if (args.currentTarget.classList.contains('e-breakfast-add-btn')) {
            currentMenuHeader = " Add Breakfast Menu";
            currentMenu = JSON.parse(JSON.stringify(breakfastMenu));
            currentRecom = breakFastRecom;
            currentAddedMenu = 'Breakfast';
        } else if (args.currentTarget.classList.contains('e-snack1-add-btn') || args.currentTarget.classList.contains('e-snack2-add-btn')) {
            currentMenuHeader = "Add Snack Menu";
            currentMenu = JSON.parse(JSON.stringify(snackMenu));
            if (args.currentTarget.classList.contains('e-snack1-add-btn')) {
                currentRecom = snack1Recom;
                currentAddedMenu = 'Snack 1';
            } else {
                currentRecom = snack2Recom;
                currentAddedMenu = 'Snack 2';
            }
        } else if (args.currentTarget.classList.contains('e-lunch-add-btn')) {
            currentMenuHeader = "Add Lunch Menu";
            currentMenu = JSON.parse(JSON.stringify(lunchMenu));
            currentRecom = lunchRecom;
            currentAddedMenu = 'Lunch';
        } else if (args.currentTarget.classList.contains('e-dinner-add-btn')) {
            currentMenuHeader = "Add Dinner Menu";
            currentMenu = JSON.parse(JSON.stringify(lunchMenu));
            currentRecom = dinnerRecom;
            currentAddedMenu = 'Dinner';
        }
        setState(prevState => {
            return {
                ...prevState,
                hidden: true,
                currentMenuHeader: currentMenuHeader,
                currentTotalCal: currentTotalCal,
                currentMenu: currentMenu,
                currentRecom: currentRecom,
                currentAddedMenu: currentAddedMenu
            }
        })
    }

    function onProfileEdit() {
        document.getElementsByClassName('e-profile-edit-dialog')[0].ej2_instances[0].show();
    }

    function onMenuCardSelect(args) {
        currentQuantity = 1;
        currentMenu = state.currentMenu;
        args.currentTarget.classList.toggle('e-card-select');
        if (args.currentTarget.classList.contains('e-card-select')) {
            lastSelectItem = args.currentTarget.innerText;
        } else {
            lastSelectItem = '';
        }
        for (var i = 0; i < currentMenu.length; i++) {
            if (currentMenu[i].item === args.currentTarget.innerText) {
                if (args.currentTarget.classList.contains('e-card-select')) {
                    currentMenu[i].isAdded = true;
                    currentMenu[i].quantity = currentQuantity;
                } else {
                    currentMenu[i].isAdded = false;
                    currentMenu[i].quantity = 0;
                }
            }
        }
        updateTotalCal();
        menudialogInstance.element.getElementsByClassName('e-quantity-total')[0].innerText = currentTotalCal + ' ' + 'kcal';
    }

    function updateTotalCal() {
        currentTotalCal = 0;
        for (var i = 0; i < currentMenu.length; i++) {
            if (currentMenu[i].isAdded) {
                currentTotalCal += (currentMenu[i].cal * currentMenu[i].quantity);
            }
        }

    }

    function quantityPlusClick() {
        currentMenu = currentMenu ? currentMenu : state.currentMenu;
        currentQuantity += 1;
        for (var i = 0; i < currentMenu.length; i++) {
            if (currentMenu[i].item === lastSelectItem) {
                currentMenu[i].quantity = currentQuantity;
            }
        }
        updateTotalCal();
        menudialogInstance.element.getElementsByClassName('e-quantity-count')[0].innerText = currentQuantity;
        menudialogInstance.element.getElementsByClassName('e-quantity-total')[0].innerText = currentTotalCal + ' ' + 'kcal';
    }

    function quantityMinusClick() {
        currentMenu = currentMenu ? currentMenu : state.currentMenu;
        currentQuantity = currentQuantity > 1 ? (currentQuantity - 1) : 1;
        for (var i = 0; i < currentMenu.length; i++) {
            if (currentMenu[i].item === lastSelectItem) {
                currentMenu[i].quantity = currentQuantity;
            }
        }
        updateTotalCal();
        menudialogInstance.element.getElementsByClassName('e-quantity-count')[0].innerText = currentQuantity;
        menudialogInstance.element.getElementsByClassName('e-quantity-total')[0].innerText = currentTotalCal + ' ' + 'kcal';
    }

    function editMenu(args) {
        let masterIndex;
        for (let i = 0; i < masterData.length; i++) {
            if (masterData[i].date === state.currentDate.toLocaleDateString()) {
                masterIndex = i;
            }
        }
        if (args.currentTarget.classList.contains('e-breakfast-edit')) {
            currentMenuHeader = " Add Breakfast Menu";
            currentMenu = JSON.parse(JSON.stringify(breakfastMenu));
            updateCurrentMenu(masterData[masterIndex].diet.breakFastMenu);
            currentRecom = breakFastRecom;
            currentAddedMenu = 'Breakfast';
        } else if (args.currentTarget.classList.contains('e-snack1-edit') || args.currentTarget.classList.contains('e-snack2-edit')) {
            currentMenuHeader = "Add Snack Menu";
            currentMenu = JSON.parse(JSON.stringify(snackMenu));
            if (args.currentTarget.classList.contains('e-snack1-edit')) {
                currentRecom = snack1Recom;
                currentAddedMenu = 'Snack 1';
                updateCurrentMenu(masterData[masterIndex].diet.snack1Menu);
            } else {
                currentRecom = snack2Recom;
                currentAddedMenu = 'Snack 2';
                updateCurrentMenu(masterData[masterIndex].diet.snack2Menu);
            }
        } else if (args.currentTarget.classList.contains('e-lunch-edit')) {
            currentMenuHeader = "Add Lunch Menu";
            currentMenu = JSON.parse(JSON.stringify(lunchMenu));
            updateCurrentMenu(masterData[masterIndex].diet.lunchMenu);
            currentRecom = lunchRecom;
            currentAddedMenu = 'Lunch';
        } else if (args.currentTarget.classList.contains('e-dinner-edit')) {
            currentMenuHeader = "Add Dinner Menu";
            currentMenu = JSON.parse(JSON.stringify(lunchMenu));
            updateCurrentMenu(masterData[masterIndex].diet.dinnerMenu);
            currentRecom = dinnerRecom;
            currentAddedMenu = 'Dinner';
        }
        updateTotalCal();
        setState(prevState => {
            return {
                ...prevState,
                hidden: true,
                currentMenuHeader: currentMenuHeader,
                currentMenu: currentMenu,
                currentRecom: currentRecom,
                currentTotalCal: currentTotalCal,
                currentAddedMenu: currentAddedMenu
            }
        })
    }

    function updateCurrentMenu(menu) {
        for (let i = 0; i < menu.length; i++) {
            for (let j = 0; j < currentMenu.length; j++) {
                if (menu[i].item === currentMenu[j].item) {
                    currentMenu[j].isAdded = true;
                    currentMenu[j].quantity = menu[i].quantity ? menu[i].quantity : 1;
                    break;
                }
            }
        }
    }

    function updateTotalCal() {
        currentTotalCal = 0;
        for (var i = 0; i < currentMenu.length; i++) {
            if (currentMenu[i].isAdded) {
                currentTotalCal += (currentMenu[i].cal * currentMenu[i].quantity);
            }
        }
    }

    function onNameChange(args) {
        profileStats.name = args.value;
    }

    function ageMinusClick() {
        profileStats.age = state.profileStats.age > 0 ? (state.profileStats.age - 1) : 0;
        profileDialogInstance.element.getElementsByClassName('e-age-count')[0].innerText = profileStats.age;
    }

    function agePlusClick() {
        if (state.profileStats.age < 100) {
            profileStats.age += 1;
        }
        profileDialogInstance.element.getElementsByClassName('e-age-count')[0].innerText = profileStats.age;
    }

    let isGoalEdit = false;
    function changeWeight() {
        if (document.querySelector('.e-weight-text') && !document.querySelector('.e-weight-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-weight-text').classList.add('e-edit-color');
        }
        if (document.querySelector('.e-goal-text') && document.querySelector('.e-goal-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-goal-text').classList.remove('e-edit-color');
        }
        if (document.querySelector('.e-height-text') && document.querySelector('.e-height-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-height-text').classList.remove('e-edit-color');
        }
        currentWtUnit = state.profileStats.weightMes.toUpperCase();
        isGoalEdit = false;
        showWeight();
        updateWeightGauge(false);
    }

    function showWeight() {
        modifyHeaderTitle = "Change Your Weight";
        if (profileDialogInstance) {
            profileDialogInstance.element.getElementsByClassName('e-modify-title')[0].innerText = modifyHeaderTitle;
        }
        modifyBtnGroup = ['KG', 'LB'];
        if (document.querySelector('.e-modify-container') && document.querySelector('.e-modify-container').classList.contains('e-hidden')) {
            document.querySelector('.e-modify-container').classList.remove('e-hidden');
        }
        if (document.querySelector('.e-weight-gauge-container') && document.querySelector('.e-weight-gauge-container').classList.contains('e-hidden')) {
            document.querySelector('.e-weight-gauge-container').classList.remove('e-hidden');
        }
        if (document.querySelector('.e-height-gauge-container') && !document.querySelector('.e-height-gauge-container').classList.contains('e-hidden')) {
            document.querySelector('.e-height-gauge-container').classList.add('e-hidden');
        }
        if (document.querySelector('.e-height-modify-btn-group') && !document.querySelector('.e-height-modify-btn-group').classList.contains('e-hidden')) {
            document.querySelector('.e-height-modify-btn-group').classList.add('e-hidden');
        }
        if (document.querySelector('.e-weight-modify-btn-group') && document.querySelector('.e-weight-modify-btn-group').classList.contains('e-hidden')) {
            document.querySelector('.e-weight-modify-btn-group').classList.remove('e-hidden');
        }
        weightSlider.refresh();
        if (!isGoalEdit) {
            if (state.profileStats.weightMes.toUpperCase() === 'KG' && document.querySelector('.e-weight-modify-btn-group #KG')) {
                (document.querySelector('.e-weight-modify-btn-group #KG')).checked = true;
            } else if (document.querySelector('.e-weight-modify-btn-group #LB')) {
                (document.querySelector('.e-weight-modify-btn-group #LB')).checked = true;
            }
        } else {
            if (state.profileStats.goalMes.toUpperCase() === 'KG' && document.querySelector('.e-weight-modify-btn-group #KG')) {
                (document.querySelector('.e-weight-modify-btn-group #KG')).checked = true;
            } else if (document.querySelector('.e-weight-modify-btn-group #LB')) {
                (document.querySelector('.e-weight-modify-btn-group #LB')).checked = true;
            }
        }
    }

    function updateWeightGauge(isGoal) {
        let goalValuearray = [];
        let weightValuearray = [];
        let goalvalue = document.getElementById('profile-value-goal').innerText;
        goalValuearray = goalvalue.split(' ');
        let weightValue = document.getElementById('profile-value-weight').innerText;
        weightValuearray = weightValue.split(' ');
        let value = isGoal ? goalValuearray[0] : weightValuearray[0];
        let wtUnit = isGoal ? goalValuearray[1] : weightValuearray[1];
        currentWtUnit = wtUnit === 'kg' ? 'KG' : 'LB';
        if (currentWtUnit == 'KG') {
            document.querySelector('.e-input-lb-btn').classList.remove('e-custom');
            document.querySelector('.e-input-kg-btn').classList.add('e-custom');
        } else if (currentWtUnit == 'LB') {
            document.querySelector('.e-input-kg-btn').classList.remove('e-custom');
            document.querySelector('.e-input-lb-btn').classList.add('e-custom');
        }
        weightGauge.axes[0].maximum = currentWtUnit === 'KG' ? 150 : 330;
        weightSlider.max = currentWtUnit === 'KG' ? 150 : 330;
        weightGauge.axes[0].annotations[0].content = '<div class="e-weight-gauge-annotation">' + value + currentWtUnit + '</div>';
        weightGauge.axes[0].ranges[0].end = value;
        weightGauge.axes[0].pointers[0].value = value;
        weightSlider.value = value;
    }


    function changeGoal() {
        if (document.querySelector('.e-weight-text') && document.querySelector('.e-weight-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-weight-text').classList.remove('e-edit-color');
        }
        if (document.querySelector('.e-goal-text') && !document.querySelector('.e-goal-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-goal-text').classList.add('e-edit-color');
        }
        if (document.querySelector('.e-height-text') && document.querySelector('.e-height-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-height-text').classList.remove('e-edit-color');
        }
        currentWtUnit = state.profileStats.goalMes.toUpperCase();
        isGoalEdit = true;
        showWeight();
        updateWeightGauge(true);
        weightGauge.refresh();
    }

    function changeHeight() {
        if (document.querySelector('.e-weight-text') && document.querySelector('.e-weight-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-weight-text').classList.remove('e-edit-color');
        }
        if (document.querySelector('.e-goal-text') && document.querySelector('.e-goal-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-goal-text').classList.remove('e-edit-color');
        }
        if (document.querySelector('.e-height-text') && !document.querySelector('.e-height-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-height-text').classList.add('e-edit-color');
        }
        modifyHeaderTitle = "Change Your Height";
        profileDialogInstance.element.getElementsByClassName('e-modify-title')[0].innerText = modifyHeaderTitle;
        modifyBtnGroup = ['CM', 'FT'];
        if (document.querySelector('.e-modify-container') && document.querySelector('.e-modify-container').classList.contains('e-hidden')) {
            document.querySelector('.e-modify-container').classList.remove('e-hidden');
        }
        if (document.querySelector('.e-weight-gauge-container') && !document.querySelector('.e-weight-gauge-container').classList.contains('e-hidden')) {
            document.querySelector('.e-weight-gauge-container').classList.add('e-hidden');
        }
        if (document.querySelector('.e-height-gauge-container') && document.querySelector('.e-height-gauge-container').classList.contains('e-hidden')) {
            document.querySelector('.e-height-gauge-container').classList.remove('e-hidden');
        }
        if (document.querySelector('.e-weight-modify-btn-group') && !document.querySelector('.e-weight-modify-btn-group').classList.contains('e-hidden')) {
            document.querySelector('.e-weight-modify-btn-group').classList.add('e-hidden');
        }
        if (document.querySelector('.e-height-modify-btn-group') && document.querySelector('.e-height-modify-btn-group').classList.contains('e-hidden')) {
            document.querySelector('.e-height-modify-btn-group').classList.remove('e-hidden');
        }
        updateHeightGauge();
        sliderHeightChange();
        heightGauge.refresh();
        heightSlider.refresh();
        if (state.profileStats.heightMes.toUpperCase() === 'CM' && document.querySelector('.e-height-modify-btn-group #CM')) {
            (document.querySelector('.e-height-modify-btn-group #CM')).checked = true;
        } else if (document.querySelector('.e-height-modify-btn-group #CM')) {
            (document.querySelector('.e-height-modify-btn-group #FT')).checked = true;
        }
    }

    function updateHeightGauge() {
        let heightValuearray = [];
        let heightValue = document.getElementById('profile-value-height').innerText;
        heightValuearray = heightValue.split(' ');
        let value = heightValuearray[0];
        let htUnit = heightValuearray[1];
        currentHtUnit = htUnit === 'cm' ? 'CM' : 'FT';
        if (currentHtUnit === 'CM') {
            document.querySelector('.e-input-ft-btn').classList.remove('e-custom');
            document.querySelector('.e-input-cm-btn').classList.add('e-custom');
        }
        else if (currentHtUnit === 'FT') {
            document.querySelector('.e-input-cm-btn').classList.remove('e-custom');
            document.querySelector('.e-input-ft-btn').classList.add('e-custom');
        }
        heightGauge.axes[0].maximum = currentHtUnit === 'CM' ? 230 : 7.5;
        heightSlider.max = currentHtUnit === 'CM' ? 230 : 7.5;
        heightSlider.limits.minStart = currentHtUnit === 'CM' ? 30 : 1;
        heightSlider.step = currentHtUnit === 'CM' ? 1 : 0.1;
        heightSlider.ticks.format = currentHtUnit === 'CM' ? 'N0' : '#.00';
        heightSlider.value = value;
        heightGauge.annotations[0].axisValue = value;
        heightGauge.annotations[0].content = '<div class="e-height-gauge-annotation">' + value + currentHtUnit + '</div>';
        heightGauge.axes[0].pointers[0].value = value;
        heightGauge.axes[0].majorTicks.interval = currentHtUnit === 'CM' ? 20 : 1;
        heightGauge.axes[0].minorTicks.interval = currentHtUnit === 'CM' ? 5 : 0.1;
        (document.querySelectorAll('#height-svg')[0]).style.height = (value * (currentHtUnit === 'CM' ? 1.7 : 52)) + 'px';
    }

    function sliderHeightChange() {
        if (heightGauge) {
            heightGauge.axes[0].pointers[0].value = heightSlider.value;
            (document.querySelectorAll('#height-svg')[0]).style.height = ((heightSlider.value) * (currentHtUnit.toUpperCase() === 'CM' ? 1.7 : 52)) + 'px';
            (document.querySelector('.e-profile-height-label')).innerHTML = (heightSlider.value) + '<span>' + ' ' + currentHtUnit + '</span>';
            (document.querySelector('.e-profile-height-label')).style.bottom = (document.querySelectorAll('#height-svg')[0]).style.height;
            (document.querySelector('.e-profile-height-label')).style.left = ((heightSlider.value) * (currentHtUnit.toUpperCase() === 'CM' ? 0.1 : 3.5)) + 'px';
        }
    }

    function onLocationChange(args) {
        profileStats.location = args.value;
    }

    function onEmailChange(args) {
        profileStats.email = args.value;
    }

    let currentTheme;
    function changeHandler(args) {
        currentTheme = args.value;
    }

    function updateHeight() {
        profileStats.heightMes = currentHtUnit.toLowerCase();
        profileStats.height = heightGauge.axes[0].pointers[0].value;
        document.getElementById('textbox_3').value = profileStats.height + ' ' + profileStats.heightMes;
        cancelHeight();
    }

    function cancelHeight() {
        if (document.querySelector('.e-modify-container') && !document.querySelector('.e-modify-container').classList.contains('e-hidden')) {
            document.querySelector('.e-modify-container').classList.add('e-hidden');
        }
    }

    function updateWeight() {
        if (isGoalEdit) {
            profileStats.goalMes = currentWtUnit.toLowerCase();
            profileStats.goal = weightGauge.axes[0].pointers[0].value;
            document.getElementById('textbox_2').value = profileStats.goal + ' ' + profileStats.goalMes;
        } else {
            profileStats.weightMes = currentWtUnit.toLowerCase();
            profileStats.weight = weightGauge.axes[0].pointers[0].value;
            document.getElementById('textbox_1').value = profileStats.weight + ' ' + profileStats.weightMes;
        }
        isGoalEdit = false;
        cancelHeight();
    }

    function cancelWeight() {
        isGoalEdit = false;
        cancelHeight();
    }

    function handleChange(args) {
        let unit;
        if (args.currentTarget.classList.contains('e-input-kg-btn')) {
            document.querySelector('.e-input-lb-btn').classList.remove('e-custom');
            document.querySelector('.e-input-kg-btn').classList.add('e-custom');
            unit = 'KG';
        }
        else if (args.currentTarget.classList.contains('e-input-lb-btn')) {
            document.querySelector('.e-input-kg-btn').classList.remove('e-custom');
            document.querySelector('.e-input-lb-btn').classList.add('e-custom');
            unit = 'LB';
        }
        else if (args.currentTarget.classList.contains('e-input-cm-btn')) {
            document.querySelector('.e-input-ft-btn').classList.remove('e-custom');
            document.querySelector('.e-input-cm-btn').classList.add('e-custom');
            unit = 'CM';
        }
        else if (args.currentTarget.classList.contains('e-input-ft-btn')) {
            document.querySelector('.e-input-cm-btn').classList.remove('e-custom');
            document.querySelector('.e-input-ft-btn').classList.add('e-custom');
            unit = 'FT';
        }

        if (['KG', 'LB'].includes(unit) && this.currentWtUnit !== unit) {
            currentWtUnit = unit;
            weightGauge.axes[0].maximum = unit === 'KG' ? 150 : 330;
            weightSlider.max = unit === 'KG' ? 150 : 330;
            weightSlider.limits.minStart = unit === 'KG' ? 10 : 20;
            let value = unit === 'KG' ? Math.round(weightSlider.value / 2.205) : Math.round(weightSlider.value * 2.205);
            weightGauge.axes[0].annotations[0].content = '<div class="e-weight-gauge-annotation">' + value + currentWtUnit + '</div>';
            weightGauge.axes[0].ranges[0].end = value;
            weightGauge.axes[0].pointers[0].value = value;
            weightSlider.value = value;
        } else if (['CM', 'FT'].includes(unit) && currentHtUnit !== unit) {
            currentHtUnit = unit;
            heightGauge.axes[0].maximum = unit === 'CM' ? 230 : 7.5;
            heightSlider.max = unit === 'CM' ? 230 : 7.5;
            heightSlider.limits.minStart = unit === 'CM' ? 30 : 1;
            heightSlider.step = unit === 'CM' ? 1 : 0.1;
            heightSlider.ticks.format = unit === 'CM' ? 'N0' : '#.00';
            let value = unit === 'CM' ? Math.round(heightSlider.value * 30.48) : Number((heightSlider.value / 30.48).toFixed(2).replace(/[.,]00$/, ""));
            heightGauge.annotations[0].axisValue = value;
            heightGauge.annotations[0].content = '<div class="e-height-gauge-annotation">' + value + this.currentHtUnit + '</div>';
            heightGauge.axes[0].pointers[0].value = value;
            heightGauge.axes[0].majorTicks.interval = unit === 'CM' ? 20 : 1;
            heightGauge.axes[0].minorTicks.interval = unit === 'CM' ? 5 : 0.1;
            (document.querySelectorAll('#height-svg')[0]).style.height = (value * (unit === 'CM' ? 1.7 : 52)) + 'px';
            heightSlider.value = value;
        }
    }

    function sliderChange() {
        weightGauge.axes[0].annotations[0].content = '<div class="e-weight-gauge-annotation">' + (weightSlider.value) + currentWtUnit + '</div>';
        weightGauge.axes[0].ranges[0].end = weightSlider.value;
        weightGauge.axes[0].pointers[0].value = weightSlider.value;
    }

    function profileDialogOpen(args) {
        profileDialogInstance = this;
        let heightbtns = document.getElementsByClassName("e-height-change-btn");
        for (var i = 0; i < heightbtns.length; i++) {
            heightbtns[i].addEventListener("click", changeHeight);
        }
        let weightbtns = document.getElementsByClassName("e-weight-change-btn");
        for (var i = 0; i < weightbtns.length; i++) {
            weightbtns[i].addEventListener("click", changeWeight);
        }
        let changeGoalbtns = document.getElementsByClassName("e-goal-change-btn");
        for (var i = 0; i < changeGoalbtns.length; i++) {
            changeGoalbtns[i].addEventListener("click", changeGoal);
        }
        let updateHeightbtns = document.getElementsByClassName("e-update-height");
        for (var i = 0; i < updateHeightbtns.length; i++) {
            updateHeightbtns[i].addEventListener("click", updateHeight);
        }
        let updateWeightbtns = document.getElementsByClassName("e-update-weight");
        for (var i = 0; i < updateWeightbtns.length; i++) {
            updateWeightbtns[i].addEventListener("click", updateWeight);
        }
        let updateWeightCancelbtns = document.getElementsByClassName("e-update-weight-cancel");
        for (var i = 0; i < updateWeightCancelbtns.length; i++) {
            updateWeightCancelbtns[i].addEventListener("click", cancelWeight);
        }
        let updateHeightCancelbtns = document.getElementsByClassName("e-update-height-cancel");
        for (var i = 0; i < updateHeightCancelbtns.length; i++) {
            updateHeightCancelbtns[i].addEventListener("click", cancelHeight);
        }
        let kgBtns = document.getElementsByClassName("e-input-kg-btn");
        for (var i = 0; i < kgBtns.length; i++) {
            kgBtns[i].addEventListener("click", handleChange);
        }
        let lbBtns = document.getElementsByClassName("e-input-lb-btn");
        for (var i = 0; i < lbBtns.length; i++) {
            lbBtns[i].addEventListener("click", handleChange);
        }
        let cmBtns = document.getElementsByClassName("e-input-cm-btn");
        for (var i = 0; i < cmBtns.length; i++) {
            cmBtns[i].addEventListener("click", handleChange);
        }
        let ftBtns = document.getElementsByClassName("e-input-ft-btn");
        for (var i = 0; i < ftBtns.length; i++) {
            ftBtns[i].addEventListener("click", handleChange);
        }
        let profileCloseBtn = document.getElementsByClassName("e-profile-back");
        for (var i = 0; i < profileCloseBtn.length; i++) {
            profileCloseBtn[i].addEventListener("click", closeEditDialog);
        }
        let minusbtns = document.getElementsByClassName("e-age-minus icon-minus");
        for (var i = 0; i < minusbtns.length; i++) {
            minusbtns[i].addEventListener("click", ageMinusClick);
        }
        let plusbtns = document.getElementsByClassName("e-age-plus icon-plus");
        for (var i = 0; i < plusbtns.length; i++) {
            plusbtns[i].addEventListener("click", agePlusClick);
        }
        args.preventFocus = true;
        currentWtUnit = '';
        if (!document.body.classList.contains('e-dark')) {
            weightGauge.axes[0].background = '#FFF7EC';
        }
        else {
            weightGauge.axes[0].background = '#414255';
        }
        weightSlider.value = document.getElementById('profile-value-weight').innerText;
        heightSlider.value = document.getElementById('profile-value-height').innerText;
        updateWeightGauge(false);
        sliderChange();
        weightGauge.refresh();
        weightSlider.refresh();
        if (document.querySelector('.e-weight-text') && !document.querySelector('.e-weight-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-weight-text').classList.add('e-edit-color');
        }
        if (document.querySelector('.e-goal-text') && document.querySelector('.e-goal-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-goal-text').classList.remove('e-edit-color');
        }
        if (document.querySelector('.e-height-text') && document.querySelector('.e-height-text').classList.contains('e-edit-color')) {
            document.querySelector('.e-height-text').classList.remove('e-edit-color');
        }
        document.getElementById('textbox_1').value = document.getElementById('profile-value-weight').innerText;
        document.getElementById('textbox_2').value = document.getElementById('profile-value-goal').innerText;
        document.getElementById('textbox_3').value = document.getElementById('profile-value-height').innerText;
    }

    function closeEditDialog() {
        document.getElementsByClassName('e-profile-edit-dialog')[0].ej2_instances[0].hide();
    }

    function profileDialogBtnClick() {
        let findlink = document.getElementById("appcssid");
        if (currentTheme === 'Light') {
            findlink.href = "https://cdn.syncfusion.com/ej2/20.2.45/tailwind.css";
            if (document.body.classList.contains('e-dark')) {
                document.body.classList.remove('e-dark');
            }
            theme = 'Tailwind';
            weightGaugeBackground = '#FFF7EC';
        } else if (currentTheme === 'Dark') {
            findlink.href = "https://cdn.syncfusion.com/ej2/20.2.45/tailwind-dark.css";
            if (!document.body.classList.contains('e-dark')) {
                document.body.classList.add('e-dark');
            }
            theme = 'TailwindDark';
            weightGaugeBackground = '#414255';
        }
        profileDialogCancelBtnClick();
        setState(prevState => {
            return {
                ...prevState,
                profileStats: profileStats,
                theme: theme,
                weightGaugeBackground: weightGaugeBackground
            }
        })
    }

    function profileDialogCancelBtnClick() {
        document.getElementsByClassName('e-profile-edit-dialog')[0].ej2_instances[0].hide();
    }

    function profileDialogBeforeOpen() {
        heightGauge = document.getElementById('heightgauge').ej2_instances[0];
        heightSlider = document.getElementById('heightrange').ej2_instances[0];
        weightGauge = document.getElementById('weightgauge').ej2_instances[0];
        weightSlider = document.getElementById('weightrange').ej2_instances[0];
        lightRadio = document.getElementById('light-theme').ej2_instances[0];
        darkRadio = document.getElementById('dark-theme').ej2_instances[0];
        changeWeight();
        if (state.profileStats.weightMes.toUpperCase() === 'KG' && document.querySelector('.e-weight-modify-btn-group #KG')) {
            (document.querySelector('.e-weight-modify-btn-group #KG')).checked = true;
        } else if (document.querySelector('.e-weight-modify-btn-group #LB')) {
            (document.querySelector('.e-weight-modify-btn-group #LB')).checked = true;
        }
        lightRadio.refresh();
        darkRadio.refresh();
    }

    function profileDialogClose() {
        let heightbtns = document.getElementsByClassName("e-height-change-btn");
        for (var i = 0; i < heightbtns.length; i++) {
            heightbtns[i].removeEventListener("click", changeHeight);
        }
        let weightbtns = document.getElementsByClassName("e-weight-change-btn");
        for (var i = 0; i < weightbtns.length; i++) {
            weightbtns[i].removeEventListener("click", changeWeight);
        }
        let changeGoalbtns = document.getElementsByClassName("e-goal-change-btn");
        for (var i = 0; i < changeGoalbtns.length; i++) {
            changeGoalbtns[i].removeEventListener("click", changeGoal);
        }
        let updateHeightbtns = document.getElementsByClassName("e-update-height");
        for (var i = 0; i < updateHeightbtns.length; i++) {
            updateHeightbtns[i].removeEventListener("click", updateHeight);
        }
        let updateWeightbtns = document.getElementsByClassName("e-update-weight");
        for (var i = 0; i < updateWeightbtns.length; i++) {
            updateWeightbtns[i].removeEventListener("click", updateWeight);
        }
        let updateWeightCancelbtns = document.getElementsByClassName("e-update-weight-cancel");
        for (var i = 0; i < updateWeightCancelbtns.length; i++) {
            updateWeightCancelbtns[i].removeEventListener("click", cancelWeight);
        }
        let updateHeightCancelbtns = document.getElementsByClassName("e-update-height-cancel");
        for (var i = 0; i < updateHeightCancelbtns.length; i++) {
            updateHeightCancelbtns[i].removeEventListener("click", cancelHeight);
        }
        let changeButton = document.querySelectorAll(".e-weight-modify-btn-group #KG,.e-weight-modify-btn-group #LB");
        for (var i = 0; i < changeButton.length; i++) {
            changeButton[i].removeEventListener("propertychange", handleChange);
        }
        let profileCloseBtn = document.getElementsByClassName("e-profile-back");
        for (var i = 0; i < profileCloseBtn.length; i++) {
            profileCloseBtn[i].removeEventListener("click", closeEditDialog);
        }
        let minusbtns = document.getElementsByClassName("e-age-minus icon-minus");
        for (var i = 0; i < minusbtns.length; i++) {
            minusbtns[i].removeEventListener("click", ageMinusClick);
        }
        let plusbtns = document.getElementsByClassName("e-age-plus icon-plus");
        for (var i = 0; i < plusbtns.length; i++) {
            plusbtns[i].removeEventListener("click", agePlusClick);
        }
        let kgBtns = document.getElementsByClassName("e-input-kg-btn");
        for (var i = 0; i < kgBtns.length; i++) {
            kgBtns[i].removeEventListener("click", handleChange);
        }
        let lbBtns = document.getElementsByClassName("e-input-lb-btn");
        for (var i = 0; i < lbBtns.length; i++) {
            lbBtns[i].removeEventListener("click", handleChange);
        }
        let cmBtns = document.getElementsByClassName("e-input-cm-btn");
        for (var i = 0; i < cmBtns.length; i++) {
            cmBtns[i].removeEventListener("click", handleChange);
        }
        let ftBtns = document.getElementsByClassName("e-input-ft-btn");
        for (var i = 0; i < ftBtns.length; i++) {
            ftBtns[i].removeEventListener("click", handleChange);
        }

    }
    let menudialogInstance;
    function dialogOpen() {
        menudialogInstance = this;
        let btns = document.getElementsByClassName("e-card e-menu-card");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", onMenuCardSelect);
        }
        let minusbtns = document.getElementsByClassName("e-quantity-minus icon-minus");
        for (var i = 0; i < minusbtns.length; i++) {
            minusbtns[i].addEventListener("click", quantityMinusClick);
        }
        let plusbtns = document.getElementsByClassName("e-quantity-plus icon-plus");
        for (var i = 0; i < plusbtns.length; i++) {
            plusbtns[i].addEventListener("click", quantityPlusClick);
        }
    }

    function dialogClose() {
        let btns = document.getElementsByClassName("e-card e-menu-card");
        for (var i = 0; i < btns.length; i++) {
            btns[i].removeEventListener("click", onMenuCardSelect);
        }
        let minusbtns = document.getElementsByClassName("e-quantity-minus icon-minus");
        for (var i = 0; i < minusbtns.length; i++) {
            minusbtns[i].removeEventListener("click", quantityMinusClick);
        }
        let plusbtns = document.getElementsByClassName("e-quantity-plus icon-plus");
        for (var i = 0; i < plusbtns.length; i++) {
            plusbtns[i].removeEventListener("click", quantityPlusClick);
        }
    }

    function profileOverLayCLick() {
        this.hide();
    }

    function dietOverLayCLick() {
        this.hide();
    }

    function chartCreated() {
        let datevalue = document.getElementsByClassName('e-datepicker')[0].ej2_instances[0].value;
        isToday = datevalue.getDate() === new Date().getDate() && datevalue.getMonth() === new Date().getMonth() && datevalue.getFullYear() === new Date().getFullYear();
        disableElements();
    }

    function profileTab() {
        return (
            <div>
                <div className="e-dashboardlayout-container e-profile-dashboardlayout-container">
                    <React.Suspense fallback>
                        <Profile currentDate={state.datePickerDate}
                            maxDate={maxDate}
                            activities={state.todayActivities}
                            profileStats={state.profileStats}
                            onProfileEdit={onProfileEdit}
                            onProfileDateChange={onProfileDateChange}></Profile>
                    </React.Suspense>
                </div>
            </div>
        )
    }
    function contentActivities() {
        let chartDietData = [];
        let chartWorkoutData= [];
        if(state.currentDropDownData[0] == 'Weekly') {
            chartDietData = state.activityChartWeeklyDietData;
            chartWorkoutData = state.activityChartWeeklyWorkoutData;
        }
        else if(state.currentDropDownData[0] == 'Monthly') {
            chartDietData = state.activityChartMonthDietData;
            chartWorkoutData = state.activityChartMonthWorkoutData;
        }

        return (
            <React.Suspense fallback>
                <ProfileDialog hidden={state.profileHidden}
                    theme={state.theme}
                    profileStats={state.profileStats}
                    name={state.profileStats.name}
                    onNameChange={onNameChange}
                    ageMinusClick={ageMinusClick}
                    agePlusClick={agePlusClick}
                    changeWeight={changeWeight}
                    changeGoal={changeGoal}
                    changeHeight={changeHeight}
                    onLocationChange={onLocationChange}
                    onEmailChange={onEmailChange}
                    changeHandler={changeHandler}
                    updateHeight={updateHeight}
                    cancelHeight={cancelHeight}
                    updateWeight={updateWeight}
                    cancelWeight={cancelWeight}
                    handleChange={handleChange}
                    closeEditDialog={closeEditDialog}
                    weightSliderLimit={weightSliderLimit}
                    heightSliderLimit={heightSliderLimit}
                    sliderChange={sliderChange}
                    sliderHeightChange={sliderHeightChange}
                    modifyHeaderTitle={modifyHeaderTitle}
                    profileDialogOpen={profileDialogOpen}
                    profileDialogClose={profileDialogClose}
                    profileDialogBeforeOpen={profileDialogBeforeOpen}
                    profiledlgButtons={profiledlgButtons}
                    weightGaugeBackground={state.weightGaugeBackground}
                    profileOverLayCLick={profileOverLayCLick}
                >
                </ProfileDialog>
                <Activities isSmallDevice={state.isSmallDevice}
                    theme={state.theme}
                    maxDate={maxDate}
                    datePickerDate={state.datePickerDate}
                    datePickerWidth={datePickerWidth}
                    onDateChange={onDateChange}
                    heartRate={state.heartRate}
                    steps={state.steps}
                    consumedCalories={state.consumedCalories}
                    expectedCalories={state.expectedCalories}
                    sleepInHours={state.sleepInHours}
                    dropDownData={state.currentDropDownData}
                    onDropDownChange={onDropDownChange}
                    chartDietData={chartDietData}
                    legendClick={legendClick}
                    chartTooltipRender={chartTooltipRender}
                    chartWorkoutData={chartWorkoutData}
                    gridData={state.gridData}
                    customiseCell={customiseCell}
                    todayActivities={state.todayActivities}
                    profileStats={state.profileStats}
                    onProfileEdit={onProfileEdit}
                    onProfileDateChange={onProfileDateChange}></Activities>
            </React.Suspense>
        )
    }
    function dietTab() {
        return (
            <React.Suspense fallback>
                <DietDialog currentMenuHeader={state.currentMenuHeader}
                    currentMenu={state.currentMenu}
                    dlgButtons={dlgButtons}
                    hidden={state.hidden}
                    currentRecom={state.currentRecom}
                    currentAddedMenu={state.currentAddedMenu}
                    currentQuantity={state.currentQuantity}
                    currentTotalCal={state.currentTotalCal}
                    quantityPlusClick={quantityPlusClick}
                    quantityMinusClick={quantityMinusClick}
                    onMenuCardSelect={onMenuCardSelect}
                    dialogOpen={dialogOpen}
                    dialogClose={dialogClose}
                    dietOverLayCLick={dietOverLayCLick} />
                <Diet isSmallDevice={state.isSmallDevice}
                    pieData={state.pieData}
                    theme={state.theme}
                    isToday={state.isToday}
                    editMenu={editMenu}
                    isBreakFastMenuAdded={state.isBreakFastMenuAdded}
                    currentBreakFastMenuText={state.currentBreakFastMenuText}
                    currentBreakFastCalories={state.currentBreakFastCalories}
                    isSnack1MenuAdded={state.isSnack1MenuAdded}
                    currentSnack1MenuText={state.currentSnack1MenuText}
                    currentSnack1Calories={state.currentSnack1Calories}
                    isLunchMenuAdded={state.isLunchMenuAdded}
                    currentLunchMenuText={state.currentLunchMenuText}
                    currentLunchCalories={state.currentLunchCalories}
                    isSnack2MenuAdded={state.isSnack2MenuAdded}
                    currentSnack2MenuText={state.currentSnack2MenuText}
                    currentSnack2Calories={state.currentSnack2Calories}
                    isDinnerMenuAdded={state.isDinnerMenuAdded}
                    currentDinnerMenuText={state.currentDinnerMenuText}
                    currentDinnerCalories={state.currentDinnerCalories}
                    breakFastRecom={breakFastRecom}
                    snack1Recom={snack1Recom}
                    lunchRecom={lunchRecom}
                    snack2Recom={snack2Recom}
                    dinnerRecom={dinnerRecom}
                    consumedCalories={state.consumedCalories}
                    expectedCalories={state.expectedCalories}
                    burnedCalories={state.burnedCalories}
                    innerWidth={innerWidth}
                    currentTotalProteins={state.currentTotalProteins}
                    currentTotalFat={state.currentTotalFat}
                    currentTotalCarbs={state.currentTotalCarbs}
                    currentTotalCalcium={state.currentTotalCalcium}
                    currentTotalSodium={state.currentTotalSodium}
                    currentTotalIron={state.currentTotalIron}
                    datePickerDate={state.datePickerDate}
                    datePickerWidth={datePickerWidth}
                    maxDate={maxDate}
                    todayActivities={state.todayActivities}
                    profileStats={state.profileStats}
                    onProfileDateChange={onProfileDateChange}
                    onProfileEdit={onProfileEdit}
                    addBtnClick={addBtnClick}>
                </Diet>
            </React.Suspense>
        )
    }

    function fastingTab() {
        return (
            <React.Suspense fallback>
                <FastingDialog hidden={hidden}
                    countStartDate={state.countStartDate}
                    countDownDate={state.countDownDate}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    fastingDlgBtnClick={fastingDlgBtnClick}
                    fastingCancelBtnClick={fastingCancelBtnClick}
                    onFastStartDateChange={onFastStartDateChange}
                    onFastEndDateChange={onFastEndDateChange}
                >
                </FastingDialog>
                <Fasting isSmallDevice={state.isSmallDevice}
                    theme={state.theme}
                    consumedWaterCount={state.consumedWaterCount}
                    consumedWaterAmount={state.consumedWaterAmount} todayActivitiemenu
                    expectedWaterAmount={state.expectedWaterAmount}
                    weightChartData={state.weightChartData}
                    datePickerDate={state.datePickerDate}
                    fastStartTime={state.fastStartTime}
                    fastEndTime={state.fastEndTime}
                    minusClick={minusClick}
                    plusClick={plusClick}
                    modifyFasting={modifyFasting}
                    chartCreated= {chartCreated}
                    changeTimeBtnText={state.changeTimeBtnText}
                    maxDate={maxDate}
                    circularGuage={state.circulargauge}
                    waterGaugeAnnotation={state.waterGaugeAnnotation}
                    waterGaugeAxes={state.waterGaugeAxes}
                    todayActivities={state.todayActivities}
                    profileStats={state.profileStats}
                    onProfileDateChange={onProfileDateChange}
                    onProfileEdit={onProfileEdit}
                    clearFasting={clearFasting}
                    quantityPlusClick={quantityPlusClick}
                    quantityMinusClick={quantityMinusClick}
                    onMenuCardSelect={onMenuCardSelect}
                    fastingGaugeLoaded={fastingGaugeLoaded}>
                </Fasting>
            </React.Suspense>
        )
    }

    return (
        <div>
            {state.isSmallDevice &&
                <div className="e-tab-header-mobile-icon-container">
                    <div className="e-tab-header-icon-div">
                        <span className="e-tab-header-icon icon-Logo"></span>
                    </div>
                    <div className="e-tab-title">GO<span>FIT</span></div>
                </div>}
            {state.isSmallDevice && <div className="separator-div"></div>}
            <TabComponent created={created} iconPosition='top' headerPlacement={headerPlacement} selecting={tabSelecting} selected={tabSelected}>
                <TabItemsDirective>
                    <TabItemDirective header={headerText[0]} content={contentActivities}></TabItemDirective>
                    <TabItemDirective header={headerText[1]} content={dietTab}></TabItemDirective>
                    <TabItemDirective header={headerText[2]} content={fastingTab}></TabItemDirective>
                    {state.isSmallDevice && <TabItemDirective header={headerText[3]} content={profileTab}></TabItemDirective>}
                </TabItemsDirective>
            </TabComponent>
        </div>
    );
}

export default Tab;
