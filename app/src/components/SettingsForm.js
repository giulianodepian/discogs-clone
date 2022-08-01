import { useState } from 'react';

const SettingsForm = () => {
    const [realName, setRealName] = useState("");
    const [profile, setProfile] = useState("");
    const [location, setLocation] = useState("");
    const [webpage, setWebpage] = useState("");
    const [image, setImage] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData();
        form.append('realname', realName);
        form.append('profile', profile)
        form.append('location', location);
        form.append('webpage', webpage);
        form.append('image', image);
        fetch('http://localhost:8080/account/update', {
            method: 'POST',
            body: form,
            credentials: "include"
        })
    }
    
    return (
        <div className="settings-acc-box">
            <form onSubmit={handleSubmit}>
                <label htmlFor="image">Profile Picture</label>
                <input type="file" id="image" accept="image/*" onChange={ (e) => {setImage(e.target.files[0])} } />
                <label htmlFor="realname">Real Name</label>
                <input type="text" id="realname" value={realName} onChange={ (e) => {setRealName(e.target.value)} } />
                <label htmlFor="profile">Profile</label>
                <textarea id="profile" value={profile} onChange={ (e) => {setProfile(e.target.value)} } />
                <label htmlFor="location">Location</label>
                <input type="text" id="location" value={location} onChange={ (e) => {setLocation(e.target.value)} } />
                <label htmlFor="webpage">Webpage</label>
                <input type="url" id="webpage" value={webpage} onChange={ (e) => {setWebpage(e.target.value)} }/>
                <input type="submit" value="Save Settings"/>
            </form>
        </div>
    )
}

export default SettingsForm;