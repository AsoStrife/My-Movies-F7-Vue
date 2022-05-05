import Localbase from 'localbase';

let db = new Localbase('db')

let auth = {}

/**
 * Check if user is logged
 * @returns boolean
 */
auth.isLogged = async() => {
    return new Promise((resolve, reject) => {
        db.collection('users').get()
        .then(users => {
            if(users.length > 0) {
                resolve(true)
            }
            else{
                resolve(false)
            }
        })
        .catch(e => {
            console.error(e)
            reject(false)
        })
    })
}

/**
 * Logout user
 * @returns boolean
 */
auth.logout = async() => {
    return new Promise((resolve, reject) => {
        db.collection('users').delete()
        .then(() => {
            resolve(true)
        })
        .catch(e => {
            console.error(e)
            reject(false)
        })
    })
    
}

export default auth; 