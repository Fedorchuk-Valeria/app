import './config'
import axios from 'axios'

export async function LoginTutor(numberPhone) {
    const url = `${global.config.host}/api/v1/tutors/login/`
    const data = {
        "phone_number": numberPhone
    }
    const headers = {
        'Content-Type': 'application/json',
    }
    return axios.post(url, data, { headers: headers })
    .then(response => {
        return response.data
    }).catch( error => {
        return null
    })
}

export async function RegisterTutor(numberPhone, branch) {
    const url = `${global.config.host}/api/v1/tutors/register/`
    const data = {
        "phone_number": numberPhone,
        "tutor_branch_id": branch
    }
    const headers = {
        'Content-Type': 'application/json',
    }
    return axios.post(url, data, { headers: headers })
    .then(response => {
        return response
    }).catch( error => {
        return null
    })
}

export async function CheckSeniorRole(token){
    const url = `${global.config.host}/api/v1/tutors/detail/`
    const headers = {
        'accept': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.get(url, { headers: headers })
    .then(response => {
        return response.data.is_senior
    }).catch( error => {
        return null
    })
}


export async function GetGroups(token){
    const url = `${global.config.host}/api/v1/tutors/groups/`
    const headers = {
        'accept': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.get(url, { headers: headers })
    .then(response => {
        return response.data
    }).catch( error => {
        return null
    })
}

export async function GetGroupsClients(groupId, token) {
    const url = `${global.config.host}/api/v1/groups/clients/?group_id=${groupId}`
    const headers = {
        'accept': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.get(url, { headers: headers })
    .then(response => {
        return response.data
    }).catch( error => {
        return null
    })
}

export async function GetNotApproveResumes(token){
    const url = `${global.config.host}/api/v1/resumes/unverified/`
    const headers = {
        'Accept': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.get(url, { headers: headers }).then(response => {
        return response.data
    }).catch( error => {
        return false
    })
}

export function CheckNotAproveResumes(resumes, client_id) {
    let check = false
    resumes.forEach(element => {
        if(element.student_crm_id == client_id) {
            check = true
        }
    });
    return check
}

export async function GetClientResumes(client_id, token) {
    const url = `${global.config.host}/api/v1/resumes/client/?student_crm_id=${client_id}`
    const headers = {
        'accept': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.get(url, { headers: headers })
    .then(response => {
        return response.data
    }).catch( error => {
        return null
    })
}

export async function EditClientResume(resume_id, newText, token) {
    const url = `${global.config.host}/api/v1/resumes/${resume_id}/`
    const data = {
        "content": newText
    }
    const headers = {
        'accept': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.post(url, data, { headers: headers })
    .then(response => {
        return response
    }).catch( error => {
        return null
    })
}

export async function AddResume(client_id, resumeText, token) {
    const url = `${global.config.host}/api/v1/resumes/`
    const data = {
        "student_crm_id": client_id,
        "content": resumeText
    }
    const headers = {
        'accept': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.post(url, data, { headers: headers })
    .then(response => {
        return response
    }).catch( error => {
        return null
    })
}

export async function GetReviews(client_id, token) {
    const url = `${global.config.host}/api/v1/reviews/${client_id}/`
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.get(url, { headers: headers })
    .then(response => {
        return response.data
    }).catch( error => {
        return null
    })
}


export async function GetTutorResidents(groups_ids_str, token) {
    let groups_ids = groups_ids_str.slice(0, -1).split(",")
    let residents = []
    for (let index = 0; index < groups_ids.length; index++) {

        let res = await GetGroupsClients(groups_ids[index], token)
        residents = residents.concat(res)
    }
    return residents
}


export async function FilderByStartDate(clients, token, startDateBorder, endDateBorder) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    let filter_clients = []
    for (let index = 0; index < clients.length; index++) {
        let id = clients[index].customer_id
        let url = `${global.config.host}/api/v1/clients/detail/?student_crm_id=${id}`
        let res = await axios.get(url, { headers: headers })
        let clientStartDateArr = res.data.custom_datano.split(".")
        let clientStartDate = new Date(clientStartDateArr[1] + "." + clientStartDateArr[0] + "." + clientStartDateArr[2])
        let startDateArr = startDateBorder.split('-') 
        let startDate = new Date(startDateArr[0] + "." + startDateArr[1] + "." + startDateArr[2])
        let endDateArr = endDateBorder.split('-') 
        let endDate = new Date(endDateArr[0] + "." + endDateArr[1] + "." + endDateArr[2])
        if (startDate <= clientStartDate && clientStartDate <= endDate) {
            filter_clients.push(clients[index])
        }
    }
    return filter_clients
}


export async function VerifyResume(resume_id, token) {
    const url = `${global.config.host}/api/v1/resumes/${resume_id}/verify/`
    const headers = {
        'accept': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.post(url, {"resime_id": resume_id}, { headers: headers })
    .then(response => {
        console.log(response.headers)
        return response
    }).catch( error => {
        return null
    })
}

export async function DeleteResume(resume_id, token) {
    const url = `${global.config.host}/api/v1/resumes/${resume_id}/`
    const headers = {
        'accept': 'application/json',
        'Authorization': "Bearer " + token
    }
    return axios.delete(url, { headers: headers })
    .then(response => {
        return response
    }).catch( error => {
        return null
    })
}