import React, { useState, useEffect } from "react";
import { Browser } from '@syncfusion/ej2-base';
import FastingDialog from "./FastingDialog";
import DietDialog from "./DietDialog";
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
var initialUpdate = true;
var getInitial = true;
let activityChartWeekData = {};
let activityChartMonthData = {};
let pieData = [];
function Tab() {
    let innerWidth = window.innerWidth;
    let x;
    let countStartDate;
    let countDownDate;
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
    let gauge;
    let dlgButtons = [{ click: menuCancelBtnClick.bind(this), buttonModel: { content: 'CANCEL', cssClass: 'e-menu-cancel' } }, { click: menuDlgBtnClick.bind(this), buttonModel: { content: 'ADD MENU', cssClass: 'e-menu-add' } }];
    let minimumDate = new Date(new Date().setHours(0, 0, 0));
    let maximumDate = new Date(new Date(new Date().setDate(minimumDate.getDate() + 1)).setHours(24, 0, 0));
    var profileStats = { name: 'John Watson', age: 24, location: 'India', weight: 70, height: 165, goal: 65, email: 'john.watson@gmail.com', weightMes: 'kg', goalMes: 'kg', heightMes: 'cm' };
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
    var currentDinnerMenu = [];
    var currentDinnerCalories = 0;
    var currentSnack2Menu = [];
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
    var currentBreakFastMenu = [];
    var currentBreakFastCalories = 0;
    var currentSnack1Menu = [];
    var currentSnack1Calories = 0;
    var currentLunchMenu = [];
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
            radius: '91%',
            angle: 350,
            content: '<div class="e-gauge-percent-img icon-Calories"></div>'
        },
        {
            zIndex: '1',
            radius: '91%',
            angle: 60,
            content: '<div class="e-gauge-status-img icon-Diet"></div>'
        },
        {
            zIndex: '1',
            radius: '91%',
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
    let weightGaugePointers = [{
        animation: { enable: false }, value: profileStats.weight, radius: '85%', color: '#F43F5E',
        pointerWidth: 12,
        cap: { radius: 12, color: '#F0D9BC' }
    }];

    let rangeLinearGradient = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#4075F2', offset: '0%' },
            { color: '#FB9906', offset: '35%' },
            { color: '#F9623A', offset: '70%' },
            { color: '#C24287', offset: '100%' },
        ]
    };
    let weightGaugeRanges = [{
        start: 0, end: profileStats.weight, startWidth: 18, endWidth: 18, color: '#F43F5E',
        linearGradient: rangeLinearGradient,
        roundedCornerRadius: 10
    }];

    let heightGaugePointerLinearGradient = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#B2CFE0', offset: '0%', opacity: 0.5 },
        ],
    };

    let heightGaugeAxes = [
        {
            minimum: 0,
            maximum: 230,
            line: {
                offset: -60,
                color: '#7D96A6'
            },
            opposedPosition: true,
            majorTicks: {
                interval: 20,
                color: '#7D96A6'
            },
            minorTicks: {
                interval: 5,
                color: '#7D96A6'
            },
            pointers: [
                {
                    type: 'Bar',
                    value: profileStats.height,
                    width: 80,
                    linearGradient: heightGaugePointerLinearGradient,
                },
                {
                    type: 'Bar',
                    height: 390,
                    width: 5,
                    value: 230,
                    color: '#7D96A6',
                    offset: -25,
                    roundedCornerRadius: 0
                }
            ],
        },
    ];

    let heightGaugeAnnotation = [{
        content: '<div class="e-height-gauge-annotation">' + profileStats.height + profileStats.heightMes + '</div>',
        axisIndex: 0,
        axisValue: profileStats.height,
        x: -50,
        y: 0, zIndex: '1'
    }
    ];

    let weightGaugeAnnotaions = [{
        content: '<div class="e-weight-gauge-annotation">' +
            profileStats.weight + profileStats.weightMes + '</div>',
        radius: '85%', angle: 180, zIndex: '1'
    }];
    var [state, setState] = useState({
        heartRate: Math.round(Math.random() * (100 - 70) + 70),
        steps: Math.round(Math.random() * (3000 - 1000) + 1000),
        consumedCalories: Math.round(Math.random() * (3000 - 1000) + 1000),
        sleepInMinutes: sleepInMinutes,
        sleepInHours: getSleepInHours(sleepInMinutes),
        currentDropDownData: dropDownData,
        gridData: getData(),
        chartDietData: getChartData('Diet'),
        chartData: getChartData('Workout'),
        activityChartWeekData: activityChartWeekData,
        activityChartMonthData: activityChartMonthData,
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
        hidden: false
    });
    var isToday = true;
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
        countDownDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(countStartDate.getHours() + 16, 0, 0, 0)) : new Date(new Date(new Date().setDate(countStartDate.getDate())).setHours(countStartDate.getHours() + 16, 0, 0, 0));
        x = setInterval(intervalFn, 1000);
        getInitialData();
    }

    // function onResize() {
    //     if (innerWidth !== window.innerWidth) {
    //         innerWidth = window.innerWidth;
    //         if (innerWidth <= 820 && !state.isSmallDevice) {
    //           setState((prevState)=>{
    //             return{
    //                 ...prevState,
    //                 isSmallDevice : true,
    //             }
    //           })
    //         } else if(state.isSmallDevice) {
    //             setState((prevState)=>{
    //                 return{
    //                     ...prevState,
    //                     isSmallDevice : false,
    //                 }
    //               })
    //         }
    //       }
    // }
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
            if (value && value === 'Monthly') {
                activityChartMonthData[action] = sampleData;
            } else {
                activityChartWeekData[action] = sampleData;
            }
        }
        return sampleData;
    }

    function getSleepInHours(minutes) {
        return Math.floor(minutes / 60) + 'h' + ' ' + (minutes % 60) + 'm';
    }

    function onDateChange(args) {
        if (initialUpdate) {
            initialUpdate = false;
            currentDate = args.value;
            updateComponents();
            initialUpdate = true;
        }

    }

    function updateConsumedCalories() {
        currentTotalProteins = 0;
        currentTotalFat = 0;
        currentTotalCarbs = 0;
        currentTotalCalcium = 0;
        currentTotalIron = 0;
        currentTotalSodium = 0;
        consumedCalories = 0;
        isBreakFastMenuAdded = state.isBreakFastMenuAdded;
        isSnack1MenuAdded =  state.isSnack1MenuAdded;
        isLunchMenuAdded = state.isLunchMenuAdded;
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
            currentBreakFastCalories = currentBreakFastMenu.reduce((a, b) => +a + +b.cal, 0);
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
            currentSnack1Calories = currentSnack1Menu.reduce((a, b) => +a + +b.cal, 0);
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
            currentLunchCalories = currentLunchMenu.reduce((a, b) => +a + +b.cal, 0);
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
            currentSnack2Calories = currentSnack2Menu.reduce((a, b) => +a + +b.cal, 0);
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
            currentDinnerCalories = currentDinnerMenu.reduce((a, b) => +a + +b.cal, 0);
            consumedCalories += currentDinnerCalories;
        }
    }

    function getInitialData() {
        let data;
        calculatingFastingStartEndTime();
        if (masterData.length === 0) {
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
                    charDietData: JSON.parse(JSON.stringify(state.chartDietData)),
                    chartData: JSON.parse(JSON.stringify(state.chartData)),
                    activityChartMonthData: JSON.parse(JSON.stringify(activityChartMonthData)),
                    activityChartWeekData: JSON.parse(JSON.stringify(activityChartWeekData)),
                    morningWalk: state.morningWalk,
                    eveningWalk: state.eveningWalk,
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
                    eveningWaterTaken: state.eveningWaterTaken,
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
        } else {
            data = masterData[0];
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
        let activities = [
            { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' },
            { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' },
            { name: 'Breakfast', activity: 'Breakfast', amount: data.diet.breakFastText, percentage: ((data.diet.breakFastCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
            { name: 'Snack1', activity: 'Snack', amount: data.diet.snack1Text, percentage: ((data.diet.snack1Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
            { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
            { name: 'Lunch', activity: 'Lunch', amount: data.diet.lunchText, percentage: ((data.diet.lunchCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
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
                chartDietData: data.activity.charDietData,
                chartData: data.activity.chartData,
                activityChartMonthData: data.activity.activityChartMonthData,
                activityChartWeekData: data.activity.activityChartWeekData,
                morningWalk: data.activity.morningWalk,
                eveningWalk: data.activity.eveningWalk,
                breakfastWaterTaken: data.diet.breakfastWaterTaken,
                lunchWaterTaken: data.diet.lunchWaterTaken,
                eveningWaterTaken: data.diet.eveningWaterTaken,
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
                        chartDietData: getChartData('Diet', state.currentDropDownData[0]),
                        chartData: getChartData('Workout', state.currentDropDownData[0]),
                        activityChartMonthData: activityChartMonthData,
                        activityChartWeekData: activityChartWeekData,
                        morningWalk: morningWalk,
                        eveningWalk: eveningWalk
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
                    chartDietData: data.activity.chartDietData,
                    chartData: data.activity.chartData,
                    activityChartMonthData: data.activity.activityChartMonthData,
                    activityChartWeekData: data.activity.activityChartWeekData,
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
                    hidden: false
                }
            })
        } else {
            state.consumedCalories = 0;
            isBreakFastMenuAdded = false;
            isSnack1MenuAdded = false;
            isLunchMenuAdded = false;
            isSnack2MenuAdded = false;
            isDinnerMenuAdded = false;
            pieData = getPieChartData();
            countStartDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(18, 0, 0, 0)) : new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(18, 0, 0, 0));
            countDownDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(countStartDate.getHours() + 16, 0, 0, 0)) : new Date(new Date(new Date().setDate(countStartDate.getDate())).setHours(countStartDate.getHours() + 16, 0, 0, 0));
            clearInterval(x);
            x = setInterval(intervalFn, 1000);
            getInitialData();
        }
        disableElements();
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
        //calculatingFastingStartEndTime();
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
        if (distance > (countDownDate.getTime() - countStartDate.getTime()) || distance < 0) {
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
            circulargauge = fastingGauge.axes;
        }
    }
    function endFasting() {
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

    function calculatingFastingStartEndTime() {
        let now = new Date();
        let isToday = countStartDate.toDateString() == now.toDateString();
        fastStartTime = (isToday ? 'Today ' : 'Yesterday ') + countStartDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        isToday = countDownDate.toDateString() == now.toDateString();
        fastEndTime = (isToday ? 'Today ' : 'Tomorrow ') + countDownDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
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
        setState(prevState => {
            return {
                ...prevState,
                chartDietData: getChartData('Diet', this.value),
                chartData: getChartData('Workout', this.value),
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
        if (initialUpdate) {
            initialUpdate = false;
            currentDate = args.value;
            updateComponents();
            initialUpdate = true;
        }
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
        titleDiv.innerText = "GOFIT";
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
    function chartCreated() {
        isToday = state.currentDate.getDate() === new Date().getDate() && state.currentDate.getMonth() === new Date().getMonth() && state.currentDate.getFullYear() === new Date().getFullYear();
        disableElements();
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
        countStartDate = fasStartValue ? fasStartValue : state.countStartDate;
        countDownDate = fasEndValue ? fasEndValue : state.countDownDate;
        clearInterval(x);
        x = setInterval(intervalFn, 1000);
        calculatingFastingStartEndTime();
        document.getElementsByClassName('e-add-fasting-dialog')[0].ej2_instances[0].hide();
        changeTimeBtnText = "CHANGE TIME";
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
                    isFastEnd: true,
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
        let isExist = false;
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
            let activity = { name: 'Breakfast', activity: 'Breakfast', amount: currentBreakFastMenuText, percentage: ((currentBreakFastCalories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%' };
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
            let activity = { name: 'Snack1', activity: 'Snack', amount: currentSnack1MenuText, percentage: ((currentSnack1Calories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%' };
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
            let activity = { name: 'Lunch', activity: 'Lunch', amount: currentLunchMenuText, percentage: ((currentLunchCalories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%' };
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
            let activity = { name: 'Snack2', activity: 'Snack', amount: currentSnack2MenuText, percentage: ((currentSnack2Calories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%' };
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
            console.log("Before updateConsumedCalories");
            console.log(currentSnack2Calories);
            updateConsumedCalories();
            console.log("after updateConsumedCalories");
            console.log(currentSnack2Calories);
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
            let activity = { name: 'Dinner', activity: 'Dinner', amount: currentDinnerMenuText, percentage: ((currentDinnerCalories / state.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%' };
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
        menudialogInstance.element.getElementsByClassName('e-quantity-total')[0].innerText = currentTotalCal;
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
        menudialogInstance.element.getElementsByClassName('e-quantity-total')[0].innerText = currentTotalCal;
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
        menudialogInstance.element.getElementsByClassName('e-quantity-total')[0].innerText = currentTotalCal;
    }

    function editMenu(args) {
        if (args.currentTarget.classList.contains('e-breakfast-edit')) {
            currentMenuHeader = " Add Breakfast Menu";
            currentMenu = JSON.parse(JSON.stringify(breakfastMenu));
            updateCurrentMenu(state.currentBreakFastMenu);
            currentRecom = breakFastRecom;
            currentAddedMenu = 'Breakfast';
        } else if (args.currentTarget.classList.contains('e-snack1-edit') || args.currentTarget.classList.contains('e-snack2-edit')) {
            currentMenuHeader = "Add Snack Menu";
            currentMenu = JSON.parse(JSON.stringify(snackMenu));
            if (args.currentTarget.classList.contains('e-snack1-edit')) {
                currentRecom = snack1Recom;
                currentAddedMenu = 'Snack 1';
                updateCurrentMenu(state.currentSnack1Menu);
            } else {
                currentRecom = snack2Recom;
                currentAddedMenu = 'Snack 2';
                updateCurrentMenu(state.currentSnack2Menu);
            }
        } else if (args.currentTarget.classList.contains('e-lunch-edit')) {
            currentMenuHeader = "Add Lunch Menu";
            currentMenu = JSON.parse(JSON.stringify(lunchMenu));
            updateCurrentMenu(state.currentLunchMenu);
            currentRecom = lunchRecom;
            currentAddedMenu = 'Lunch';
        } else if (args.currentTarget.classList.contains('e-dinner-edit')) {
            currentMenuHeader = "Add Dinner Menu";
            currentMenu = JSON.parse(JSON.stringify(lunchMenu));
            updateCurrentMenu(state.currentDinnerMenu);
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

    function onNameChange() {

    }

    function ageMinusClick() {

    }

    function agePlusClick() {

    }

    function changeWeight() {

    }

    function changeGoal() {

    }

    function changeHeight() {

    }

    function onLocationChange() {

    }

    function onEmailChange() {

    }

    function changeHandler() {

    }

    function updateHeight() {

    }

    function cancelHeight() {

    }

    function updateWeight() {

    }

    function cancelWeight() {

    }

    function handleChange() {

    }

    function sliderChange() {

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

    function profileTab() {
        return (
            <div className="e-dashboardlayout-container e-profile-dashboardlayout-container">
                <React.Suspense fallback="Loading">
                    <Profile currentDate={state.datePickerDate}
                        maxDate={maxDate}
                        activities={state.todayActivities}
                        profileStats={profileStats}
                        onProfileEdit={onProfileEdit}
                        onProfileDateChange={onProfileDateChange}></Profile>
                </React.Suspense>
            </div>
        )
    }
    function contentActivities() {
        return (
            <React.Suspense fallback="Loading">
                {/* <ProfileDialog hidden={true}
                    profileStats={profileStats}
                    name={profileStats.name}
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
                    weightGaugeRanges={weightGaugeRanges}
                    weightGaugePointers={weightGaugePointers}
                    weightGaugeAnnotaions={weightGaugeAnnotaions}
                    sliderChange={sliderChange}
                    heightGaugeAxes={heightGaugeAxes}
                    heightGaugeAnnotation={heightGaugeAnnotation}>
                    </ProfileDialog> */}
                <Activities isSmallDevice={state.isSmallDevice}
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
                    chartDietData={state.chartDietData}
                    legendClick={legendClick}
                    chartTooltipRender={chartTooltipRender}
                    chartData={state.chartData}
                    gridData={state.gridData}
                    customiseCell={customiseCell}
                    todayActivities={state.todayActivities}
                    profileStats={profileStats}
                    onProfileDateChange={onProfileDateChange}></Activities>
            </React.Suspense>
        )
    }
    function dietTab() {
        return (
            <React.Suspense fallback="Loading">
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
                    dialogClose={dialogClose} />
                <Diet isSmallDevice={state.isSmallDevice}
                    pieData={state.pieData}
                    isToday={isToday}
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
                    profileStats={profileStats}
                    onProfileDateChange={onProfileDateChange}
                    addBtnClick={addBtnClick}>
                </Diet>
            </React.Suspense>
        )
    }

    function fastingTab() {
        return (
            <React.Suspense fallback="Loading">
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
                    changeTimeBtnText={state.changeTimeBtnText}
                    maxDate={maxDate}
                    circularGuage={state.circulargauge}
                    waterGaugeAnnotation={state.waterGaugeAnnotation}
                    waterGaugeAxes={state.waterGaugeAxes}
                    todayActivities={state.todayActivities}
                    profileStats={profileStats}
                    onProfileDateChange={onProfileDateChange}
                    clearFasting={clearFasting}
                    quantityPlusClick={quantityPlusClick}
                    quantityMinusClick={quantityMinusClick}
                    onMenuCardSelect={onMenuCardSelect}
                    chartCreated={chartCreated}
                    fastingGaugeLoaded={fastingGaugeLoaded}>
                </Fasting>
            </React.Suspense>
        )
    }

    return (
        <TabComponent created={created} iconPosition='top' headerPlacement="headerPlacement" selecting={tabSelecting} selected={tabSelected}>
            <TabItemsDirective>
                <TabItemDirective header={headerText[0]} content={contentActivities}></TabItemDirective>
                <TabItemDirective header={headerText[1]} content={dietTab}></TabItemDirective>
                <TabItemDirective header={headerText[2]} content={fastingTab}></TabItemDirective>
                {state.isSmallDevice && <TabItemDirective header={headerText[3]} content={profileTab}></TabItemDirective>}
            </TabItemsDirective>
        </TabComponent>
    );
}

export default Tab;
