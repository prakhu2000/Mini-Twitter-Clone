const base = "http://localhost:5000";

export const register_user = async(obj) => {
    const res = await fetch(`${base}/api/user/register`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}
export const is_Authenticated=async()=>{
    const res = await fetch(`${base}/api/user/isLoggedIn`, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem("token")
        },
    });
    const ans = await res.json();
    return ans;
}

export const find_people=async()=>{
    const res = await fetch(`${base}/api/user/findPeople`, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem("token")
        },
    });
    const ans = await res.json();
    return ans;
}

export const my_profile=async()=>{
    const res = await fetch(`${base}/api/user/myProfile`, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem("token")
        },
    });
    const ans = await res.json();
    return ans;
}

export const is_follower = async(obj) => {
    const res = await fetch(`${base}/api/user/isFollower/${obj.authorId}`, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem("token")
        },
    });
    const ans = await res.json();
    return ans;
}

export const login_user = async(obj) => {
    const res = await fetch(`${base}/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}