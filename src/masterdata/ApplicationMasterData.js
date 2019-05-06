export const TicketStatus = {
    OPEN: 'Open', CLOSE: 'Closed', NEW: 'New', IN_PROCESS: 'Processing', PENDING: 'Pending',
    AWAIT_RESPONSE: 'AwaitingResponse', ALL: 'all'
};

export const TicketStatusCode = {
    IN_PROCESS: 1, PENDING: 2, NEW: 3, CLOSE: 4, OPEN: 5, AWAIT_RESPONSE: 6
};


export const Priority = {
    HIGH: 'High', MEDIUM: 'Medium', LOW: 'Low'
}

export const PriorityCode = {
    HIGH: 1, MEDIUM: 2, LOW: 3
}


export const TicketType = {
    TASK: 'Task', ISSUE: 'Issue', PROBLEM: 'Problem'
}

export const TicketTypeCode = {
    TASK: 1, ISSUE: 2, PROBLEM: 3
}

export const Role = {
    ROLE_USER: 'ROLE_USER', ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_ENGINEER: 'ROLE_ENGINEER', ROLE_EMPLOYEE: 'ROLE_EMPLOYEE', ROLE_MANAGER: 'ROLE_MANAGER'
}

/***Form Title and SubTitle data START***/
export const componentInfoObj = {
    getInfo : (key) => {
        switch(key){
            case 'AST':
            return {
                title: "Assigned Tickets",
                subTitle: "Tickets that need to be actioned."
            }

            case 'NT':
            return {
                title: 'Create Ticket',
                subTitle: 'Raise and provide as much as information for speedy resolution.'
            }

            case 'CLT':
            return {
                title: "Closed Tickets",
                subTitle: "Reopen if any of the tickets is not resolved."
            }

            case 'ALT':
            return {
                title: "My Tickets",
                subTitle: "Monitor your ticket activity and update Tickets that need your response."
            }

            case 'MDB':
            return {
                title: "Dashboard",
                subTitle: "Statistics to make informed decisions."
            }

            case 'EDB':
            return {
                title: "My Board",
                subTitle: "Your credits, badges etc. Update the profile if need be."
            }
            
            default:
            return {
                title: "Default Title",
                subTitle: "Default Sub-Title."
            } 

        }
    },

    getDefaultInfo : () => {
        return {
            title: "Default Title",
            subTitle: "Default Sub-Title."
        } 
    }


}
/***Form Title and SubTitle data END***/



