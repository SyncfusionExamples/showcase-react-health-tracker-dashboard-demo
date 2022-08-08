import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Browser } from '@syncfusion/ej2-base';
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
    var sleepInMinutes = Math.round(Math.random() * (480 - 300) + 300);
    let breakFastRecom = 440;
    let snack1Recom = 165;
    let lunchRecom = 440;
    let snack2Recom = 165;
    let dinnerRecom = 440;
    let currentMenuHeader;
    let currentMenu;
    let currentRecom = 0;
    let currentAddedMenu;
    var today = new Date();
    var currentDate = today;
    var maxDate = new Date();
    let dropDownInstance;
    let chartInstance;
    let gridInstance;
    var burnedCalories = 0;
    var todaysWorkoutPercent = 80;
    var theme = 'Tailwind';
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
    var consumedWaterCount = 4;
    var consumedWaterAmount = 600;
    var currentDinnerMenu = [];
    var currentDinnerCalories = 0;
    var currentSnack2Menu = [];
    var currentSnack2Calories = 0;
    var isBreakFastMenuAdded = false;
    var isSnack1MenuAdded = false;
    var isLunchMenuAdded = false;
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
        expectedWaterAmount: 2400,
        expectedCalories: 3000,
        todayActivities: [],
        datePickerDate: currentDate,
        isSmallDevice: false,
        pieData : pieData,
        currentBreakFastMenuText: currentBreakFastMenuText,
        currentBreakFastCalories: currentBreakFastCalories,
        currentSnack1MenuText: currentSnack1MenuText,
        currentSnack1Calories: currentSnack1Calories,
        currentLunchMenuText : currentLunchMenuText,
        currentLunchCalories: currentLunchCalories,
        currentSnack2MenuText: currentSnack2MenuText,
        currentSnack2Calories: currentSnack2Calories,
        currentDinnerMenuText: currentDinnerMenuText,
        currentDinnerCalories: currentDinnerCalories,
        currentTotalProteins: currentTotalProteins,
        currentTotalFat: currentTotalFat,
        currentTotalCarbs : currentTotalCarbs,
        currentTotalCalcium : currentTotalCalcium,
        currentTotalSodium : currentTotalSodium,
        currentTotalIron : currentTotalIron,
        isBreakFastMenuAdded : isBreakFastMenuAdded,
        isSnack1MenuAdded : isSnack1MenuAdded,
        isLunchMenuAdded : isLunchMenuAdded,
        isSnack2MenuAdded : isSnack2MenuAdded,
        isDinnerMenuAdded : isDinnerMenuAdded,
        consumedWaterCount : consumedWaterCount,
        consumedWaterAmount : consumedWaterAmount,
        weightChartData : getWeightChartData()
    });
    var isToday = true;

    // useEffect(()=>{
    //     //window.addEventListener('resize', onResize);
    // },[]);

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
    function   getWeightChartData() {
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
        if ((value && value === 'Monthly' && activityChartMonthData[action] && activityChartMonthData[action].length > 0) || (value && value === 'Weekly' && activityChartWeekData[action] && activityChartWeekData[action].length > 0)) {
            if (value === 'Monthly') {
                sampleData = activityChartMonthData[action];
            } else {
                sampleData = activityChartWeekData[action];
            }
        } else {
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
        if (masterData.length === 0) {
            let breakfastWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
            let lunchWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
            consumedWaterCount = breakfastWaterTaken + lunchWaterTaken;
            consumedWaterAmount = consumedWaterCount * 150;
            data = {
                date: currentDate.toLocaleDateString(),
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
                    pieData : pieData,
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
                    consumedCalories: state.consumedCalories,
                    burnedCalories: burnedCalories,
                    breakfastWaterTaken: state.breakfastWaterTaken,
                    expectedWaterAmount: state.expectedWaterAmount,
                    lunchWaterTaken: lunchWaterTaken,
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
                    weightChartData : state.weightChartData
                }
            };
            masterData.push(data);
        } else {
            data = masterData[0];
            // activityChartMonthData = data.activity.activityChartMonthData;
            // activityChartWeekData = data.activity.activityChartWeekData;
            // burnedCalories = data.diet.burnedCalories;
            // currentBreakFastMenu = data.diet.breakFastMenu;
            // currentBreakFastCalories = data.diet.breakFastCalories;
            // currentBreakFastMenuText = data.diet.breakFastText;
            // isBreakFastMenuAdded = data.diet.isBreakFastMenuAdded;
            // currentSnack1Menu = data.diet.snack1Menu;
            // currentSnack1Calories = data.diet.snack1Calories;
            // currentSnack1MenuText = data.diet.snack1Text;
            // isSnack1MenuAdded = data.diet.isSnack1Added;
            // currentLunchMenu = data.diet.lunchMenu;
            // currentLunchCalories = data.diet.lunchCalories;
            // currentLunchMenuText = data.diet.lunchText;
            // isLunchMenuAdded = data.diet.isLunchAdded;
            // currentDinnerMenu = data.diet.dinnerMenu;
            // currentDinnerCalories = data.diet.dinnerCalories;
            // currentDinnerMenuText = data.diet.dinnerText;
            // isDinnerMenuAdded = data.diet.isDinnerMenuAdded;
            // currentSnack2Menu = data.diet.snack2Menu;
            // currentSnack2Calories = data.diet.snack2Calories;
            // currentSnack2MenuText = data.diet.snack2Text;
            // isSnack2MenuAdded = data.diet.isSnack2MenuAdded;
            // currentTotalProteins = data.diet.proteins;
            // currentTotalFat = data.diet.fat;
            // currentTotalCarbs = data.diet.carbs;
            // currentTotalCalcium = data.diet.calcium;
            // currentTotalSodium = data.diet.sodium;
            // currentTotalIron = data.diet.iron;
        }


        let SmallDevice = false;
        if (innerWidth <= 820) {
            SmallDevice = true;
        }

        let activities = [
            { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' },
            { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' },
            { name: 'Breakfast', activity: 'Breakfast', amount: data.diet.breakFastText, percentage: ((data.diet.breakFastCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
            { name: 'Snack1', activity: 'Snack', amount: data.diet.snack1Text, percentage: ((data.diet.snack1Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
            { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
            { name: 'Lunch', activity: 'Lunch', amount: data.diet.lunchText, percentage: ((data.diet.lunchCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
        ];
        setState(() => {
            return {
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
                expectedWaterAmount: data.diet.expectedWaterAmount,
                pieData: data.diet.pieData,
                expectedCalories: data.diet.expectedCalories,
                todayActivities: activities,
                datePickerDate: currentDate,
                isSmallDevice: SmallDevice,
                currentBreakFastMenuText: data.diet.breakFastText,
                currentBreakFastCalories : data.diet.breakFastCalories,
                currentSnack1MenuText : data.diet.snack1Text,
                currentSnack1Calories : data.diet.snack1Calories,
                currentLunchMenuText : data.diet.lunchText,
                currentLunchCalories : data.diet.lunchCalories,
                currentSnack2MenuText : data.diet.snack2Text,
                currentSnack2Calories : data.diet.snack2Calories,
                currentDinnerMenuText : data.diet.dinnerText,
                currentDinnerCalories : data.diet.dinnerCalories,
                currentTotalProteins : data.diet.proteins,
                currentTotalFat : data.diet.fat,
                currentTotalCarbs : data.diet.carbs,
                currentTotalCalcium : data.diet.calcium,
                currentTotalSodium : data.diet.sodium,
                currentTotalIron : data.diet.iron,
                isBreakFastMenuAdded : data.diet.isBreakFastMenuAdded,
                isSnack1MenuAdded : data.diet.isSnack1Added,
                isLunchMenuAdded : data.diet.isLunchAdded,
                isDinnerMenuAdded : data.diet.isDinnerMenuAdded,
                isSnack2MenuAdded : data.diet.isSnack2MenuAdded,
                consumedWaterCount : data.fasting.consumedWaterCount,
                consumedWaterAmount : data.fasting.consumedWaterAmount,
                weightChartData : data.fasting.weightChartData
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
                // activityChartMonthData = data.activity.activityChartMonthData;
                // activityChartWeekData = data.activityChartWeekData;
                // currentBreakFastMenu = data.diet.breakFastMenu;
                // currentBreakFastCalories = data.diet.breakFastCalories;
                // currentBreakFastMenuText = data.diet.breakFastText;
                // isBreakFastMenuAdded = data.diet.isBreakFastMenuAdded;
                // currentSnack1Menu = data.diet.snack1Menu;
                // currentSnack1Calories = data.diet.snack1Calories;
                // currentSnack1MenuText = data.diet.snack1Text;
                // isSnack1MenuAdded = data.diet.isSnack1Added;
                // currentSnack2Menu = data.diet.snack2Menu;
                // currentSnack2Calories = data.diet.snack2Calories;
                // currentSnack2MenuText = data.diet.snack2Text;
                // isSnack2MenuAdded = data.diet.isSnack2MenuAdded;
                // currentLunchMenu = data.diet.lunchMenu;
                // currentLunchCalories = data.diet.lunchCalories;
                // currentLunchMenuText = data.diet.lunchText;
                // isLunchMenuAdded = data.diet.isLunchAdded;
                // currentDinnerMenu = data.diet.dinnerMenu;
                // currentDinnerCalories = data.diet.dinnerCalories;
                // currentDinnerMenuText = data.diet.dinnerText;
                // isDinnerMenuAdded = data.diet.isDinnerMenuAdded;
                // currentTotalProteins = data.diet.proteins;
                // currentTotalFat = data.diet.fat;
                // currentTotalCarbs = data.diet.carbs;
                // currentTotalCalcium = data.diet.calcium;
                // currentTotalSodium = data.diet.sodium;
                // currentTotalIron = data.diet.iron;
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
                        pieData : pieData,
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
                        consumedCalories: Math.round(Math.random() * (3000 - 1000) + 1000),
                        burnedCalories: burnedCalories,
                        breakfastWaterTaken: Math.round(Math.random() * (5 - 2) + 2),
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
                        weightChartData : getWeightChartData()
                    }
                };
                masterData.push(data);
            }

            let smallDevice = false;
            if (innerWidth <= 820) {
                smallDevice = true;
            }
            let updateActivities = [
                { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' },
                { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' },
                { name: 'Breakfast', activity: 'Breakfast', amount: currentBreakFastMenuText, percentage: ((currentBreakFastCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
                { name: 'Snack1', activity: 'Snack', amount: currentSnack1MenuText, percentage: ((currentSnack1Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
                { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
                { name: 'Lunch', activity: 'Lunch', amount: currentLunchMenuText, percentage: ((currentLunchCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
                { name: 'Snack2', activity: 'Snack', amount: currentSnack2MenuText, percentage: ((currentSnack2Calories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '3:00 PM' },
                { name: 'Evening Water', activity: 'Water Taken', count: data.diet.eveningWaterTaken, amount: data.diet.eveningWaterTaken + ' Glasses', percentage: (((data.diet.eveningWaterTaken * 150) / data.diet.expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '4:00 PM' },
                { name: 'Evening Walk', activity: 'Evening Walk', duration: '30m', distance: (data.activity.eveningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.eveningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '5:30 PM' },
                { name: 'Dinner', activity: 'Dinner', amount: currentDinnerMenuText, percentage: ((currentDinnerCalories / data.diet.expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '8:00 PM' }
            ];
            setState(() => {
                return {
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
                    pieData:data.diet.pieData,
                    breakfastWaterTaken: data.diet.breakfastWaterTaken,
                    expectedWaterAmount: data.diet.expectedWaterAmount,
                    todayActivities: updateActivities,
                    datePickerDate: currentDate,
                    expectedCalories: data.diet.expectedCalories,
                    isSmallDevice: smallDevice,
                    currentBreakFastMenuText: data.diet.breakFastText,
                    currentBreakFastCalories: data.diet.breakFastCalories,
                    currentSnack1MenuText : data.diet.snack1Text,
                    currentSnack1Calories : data.diet.snack1Calories,
                    currentLunchMenuText : data.diet.lunchText,
                    currentLunchCalories : data.diet.lunchCalories,
                    currentSnack2MenuText : data.diet.snack2Text,
                    currentSnack2Calories : data.diet.snack2Calories,
                    currentDinnerMenuText : data.diet.dinnerText,
                    currentDinnerCalories : data.diet.dinnerCalories,
                    currentTotalProteins : data.diet.proteins,
                    currentTotalFat : data.diet.fat,
                    currentTotalCarbs : data.diet.carbs,
                    currentTotalCalcium : data.diet.calcium,
                    currentTotalSodium : data.diet.sodium,
                    currentTotalIron : data.diet.iron,
                    isBreakFastMenuAdded : data.diet.isBreakFastMenuAdded,
                    isSnack1MenuAdded : data.diet.isSnack1Added,
                    isLunchMenuAdded : data.diet.isLunchAdded,
                    isDinnerMenuAdded : data.diet.isDinnerAdded,
                    isSnack2MenuAdded : data.diet.isSnack2Added,
                    consumedWaterCount : data.fasting.consumedWaterCount,
                    consumedWaterAmount : data.fasting.consumedWaterAmount,
                    weightChartData : data.fasting.weightChartData
                }
            })
        } else {
            state.consumedCalories = 0;
            isBreakFastMenuAdded = false;
            isSnack1MenuAdded = false;
            isLunchMenuAdded = false;
            isSnack2MenuAdded = false;
            isDinnerMenuAdded = false;
            getInitialData();
            pieData = getPieChartData();
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
                currentDropDownData: dropvalue
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
    function tabSelected(e) {
        if(document.getElementsByClassName('e-chart')[0]) {
            document.getElementsByClassName('e-chart')[0].ej2_instances[0].refresh();
        }
        if(document.getElementsByClassName('e-accumulationchart')[0]) {
            document.getElementsByClassName('e-accumulationchart')[0].ej2_instances[0].refresh();
        }
    }

    function editMenu(args) {

        console.log("Edit menu called");
        // if (args.currentTarget.classList.contains('e-breakfast-edit')) {
        //   currentMenuHeader = " Add Breakfast Menu";
        //   currentMenu = JSON.parse(JSON.stringify(breakfastMenu));
        //   //updateCurrentMenu(this.currentBreakFastMenu);
        //   currentRecom = breakFastRecom;
        //   currentAddedMenu = 'Breakfast';
        // } else if (args.currentTarget.classList.contains('e-snack1-edit') || args.currentTarget.classList.contains('e-snack2-edit')) {
        //   currentMenuHeader = "Add Snack Menu";
        //   currentMenu = JSON.parse(JSON.stringify(snackMenu));
        //   if (args.currentTarget.classList.contains('e-snack1-edit')) {
        //     currentRecom = snack1Recom;
        //     currentAddedMenu = 'Snack 1';
        //     //updateCurrentMenu(currentSnack1Menu);
        //   } else {
        //     currentRecom = snack2Recom;
        //     currentAddedMenu = 'Snack 2';
        //     //updateCurrentMenu(this.currentSnack2Menu);
        //   }
        // } else if (args.currentTarget.classList.contains('e-lunch-edit')) {
        //   currentMenuHeader = "Add Lunch Menu";
        //   currentMenu = JSON.parse(JSON.stringify(lunchMenu));
        //   //this.updateCurrentMenu(this.currentLunchMenu);
        //   currentRecom = lunchRecom;
        //   currentAddedMenu = 'Lunch';
        // } else if (args.currentTarget.classList.contains('e-dinner-edit')) {
        //   currentMenuHeader = "Add Dinner Menu";
        //   this.currentMenu = JSON.parse(JSON.stringify(this.lunchMenu));
        //   this.updateCurrentMenu(this.currentDinnerMenu);
        //   this.currentRecom = this.dinnerRecom;
        //   this.currentAddedMenu = 'Dinner';
        // }
        // this.updateTotalCal();
        // this.menuDialog.show();
      }
    function profileTab() {
        return (
            <div className="e-dashboardlayout-container e-profile-dashboardlayout-container">
                <React.Suspense fallback="Loading">
                    <Profile currentDate={state.datePickerDate} 
                    maxDate={maxDate} 
                    activities={state.todayActivities} 
                    profileStats={profileStats} 
                    onProfileDateChange={onProfileDateChange}></Profile>
                </React.Suspense>
            </div>
        )
    }
    function contentActivities() {
        return (
            <React.Suspense fallback="Loading">
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
                <Diet isSmallDevice={state.isSmallDevice} 
                pieData={state.pieData}
                isToday = {isToday} 
                editMenu={editMenu}  
                isBreakFastMenuAdded = {state.isBreakFastMenuAdded} 
                currentBreakFastMenuText={state.currentBreakFastMenuText} 
                currentBreakFastCalories={state.currentBreakFastCalories} 
                isSnack1MenuAdded={state.isSnack1MenuAdded} 
                currentSnack1MenuText={state.currentSnack1MenuText} 
                currentSnack1Calories={state.currentSnack1Calories} 
                isLunchMenuAdded={state.isLunchMenuAdded} 
                currentLunchMenuText={state.currentLunchMenuText}
                currentLunchCalories={state.currentLunchCalories} 
                isSnack2MenuAdded={state.isSnack2MenuAdded}
                currentSnack2MenuText = {state.currentSnack2MenuText} 
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
                burnedCalories={burnedCalories} 
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
                onProfileDateChange={onProfileDateChange}>
                </Diet>
            </React.Suspense>
        )
    }

    function fastingTab() {
        return(
            <React.Suspense fallback="Loading">
                <Fasting isSmallDevice={state.isSmallDevice}
                    consumedWaterCount={state.consumedWaterCount}
                    consumedWaterAmount={state.consumedWaterAmount}
                    expectedWaterAmount = {state.expectedWaterAmount}
                    weightChartData = {state.weightChartData}
                    datePickerDate={state.datePickerDate}
                    maxDate={maxDate} 
                    todayActivities={state.todayActivities} 
                    profileStats={profileStats} 
                    onProfileDateChange={onProfileDateChange}>
                </Fasting>
            </React.Suspense>
        )
    }

    return (
        <TabComponent created={created} iconPosition='top' headerPlacement="headerPlacement" selecting={tabSelecting} selected={tabSelected} >
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
