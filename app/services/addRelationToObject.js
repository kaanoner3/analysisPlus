import {getRelationshipStatus} from 'services'

async function addRelationToObject(object,accessToken) {
    object.map((item,index) => {
        getRelationshipStatus(accessToken,item.id).then(response => {
            const status = response.data.data

        })
    })
}

export default addRelationToObject