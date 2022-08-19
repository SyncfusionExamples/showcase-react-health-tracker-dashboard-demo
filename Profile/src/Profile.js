import React from "react";
import ProfilePicture from './assets/Profile/02.png';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';


function Profile(props) {
    let currentDate = props.currentDate;
    let activities = props.activities;
    let profileStats = props.profileStats;
    let maxDate = props.maxDate;

    function getFullDetails(activity,index) {
        let distance = activity.distance;
        return (
            <div key={index} tabIndex={0} className="e-card e-diet-card" >
                <div className="e-card-header" style={{ width: "100%" }}>
                    <div className="e-card-header-caption">
                        <div className="e-card-header-title">{activity.activity}</div>
                        <div>
                            <div className="e-card-header-sub-title" style={{ float: "left" }}>
                                {activity.amount ? (activity.amount + ' | ') : ''}
                                {activity.duration ? (activity.duration + ' | ') : ''}
                                {activity.distance ? (activity.distance + ' | ') : ''}
                                { distance && <span className="e-activity-highlight">{activity.percentage}</span>}
                                { !distance && <span className="e-meals-highlight">{activity.percentage}</span>}
                            </div>
                            <div className="e-card-header-sub-title" style={{ float: "right" }}>{activity.time}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
       
        <div id="activity-profile-panel-id" className="e-panel e-activity-profile-panel">
            <div className="e-panel-container">
                <div>
                    <div className="e-card e-custom-card">
                        <div className="e-card-header">
                            <div className="e-avatar e-avatar-circle">
                                <img src={ProfilePicture} alt="JW" />
                            </div>
                            <div className="e-profile-editor" >
                                <div className="e-profile-inner-editor" onClick={props.onProfileEdit}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            &nbsp;
                        </div>
                        <div className="e-card-header">
                            <div className="e-card-header-caption center">
                                <div className="e-card-header-title">{profileStats.name}</div>
                                <div className="e-card-header-sub-title">{profileStats.age} Years, {profileStats.location}</div>
                            </div>
                        </div>
                        <div className="e-card-content">
                            <table className="e-profile-details">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="profile-row">Weight</div>
                                        </td>
                                        <td>
                                            <div className="profile-row">Height</div>
                                        </td>
                                        <td>
                                            <div className="profile-row">Goal</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="profile-value">{profileStats.weight + ' ' + profileStats.weightMes}</div>
                                        </td>
                                        <td>
                                            <div className="profile-value">{profileStats.height + ' ' + profileStats.heightMes}</div>
                                        </td>
                                        <td>
                                            <div className="profile-value">{profileStats.goal + ' ' + profileStats.goalMes}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="e-journal" style={{ float: "left" }}>Journals</div>
                        <div className="e-journal-date" style={{ float: "right" }}>
                            <DatePickerComponent value={currentDate} max={maxDate} width="100%" change={props.onProfileDateChange}></DatePickerComponent>
                        </div>
                    </div>
                    <div className="profile-diet-card-container">{activities.map(getFullDetails)}</div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
