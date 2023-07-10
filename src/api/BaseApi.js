import axios from "axios"

const baseLambdaUrl = "https://b3i2xui1e5.execute-api.eu-west-1.amazonaws.com"

const BaseApi = {
    rejectLead: async ({ markerId, queryId }) => {
        return axios.post(
            `${baseLambdaUrl}/messages/leads/reject`,
            {
              marker_id: markerId,
              query_id: queryId,
            }
        )
    },
    logQPageLoad: async ({ markerId, queryId }) => {
        return axios.post(
            `${baseLambdaUrl}/logs/nearmarket/q`, 
            {
                marker_id: markerId,
                query_id: queryId,
                tag: 'page_load'
            }
        )
    },
    getSingleLead: async ({ queryId }) => {
        return axios.get(`${baseLambdaUrl}/messages/leads/single?query_id=${queryId}`)
    },
    unsubscribeLeads: async ({ markerId }) => {
        return axios.get(`https://crm.onecallapp.com/api/broadcast/unsubscribe-marker/${markerId}`)
    },
    updateLeadAsRead: async ({ markerId, queryId }) => {
        return axios.post(
            `${baseLambdaUrl}/messages/leads/update-as-read`,
            {
                marker_id: markerId,
                query_id: queryId
            }
        )
    },
    logQClickedOnCallNow: async ({ markerId, queryId }) => {
        return axios.post(
            `${baseLambdaUrl}/logs/nearmarket/q`, 
            {
                marker_id: markerId,
                query_id: queryId,
                tag: 'clicked_on_call_now'
            }
        )
    }
}

export default BaseApi