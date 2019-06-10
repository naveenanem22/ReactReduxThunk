export const TicketStatus = {
    OPEN: 'Open', CLOSE: 'Closed', NEW: 'New', IN_PROCESS: 'Processing', PENDING: 'Pending',
    AWAIT_RESPONSE: 'AwaitingResponse', ALL: 'all'
};

export const TicketStatusCode = {
    IN_PROCESS: 1, PENDING: 2, NEW: 3, CLOSE: 4, OPEN: 5, AWAIT_RESPONSE: 6
};

export const TICKETS_PER_PAGE_EMPLOYEE = 3;
export const TICKETS_PER_PAGE_MANAGER = 5;
export const TICKETS_PER_PAGE_ENGINEER = 5;

export const PAGINATION_START_PAGE = 1;


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
    getInfo: (key) => {
        switch (key) {
            case 'PRF':
                return {
                    title: "My Profile",
                    subTitle: "Please verify your profile details and update if you should."
                }
            case 'AST':
                return {
                    title: "Assigned Tickets",
                    subTitle: "Tickets that need to be actioned. Action based on priority and severity."
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

            case 'AWT':
                return {
                    title: "Awaiting Response Tickets",
                    subTitle: "Contact respective employee if no response provided beyond certain time limit."
                }

            case 'MDB':
                return {
                    title: "Dashboard",
                    subTitle: "Organization wide Ticket-Dynamics to take informed decisions."
                }

            case 'ENDB':
                return {
                    title: "My Board",
                    subTitle: "Your credits, badges etc. Update the profile if need be."
                }

            case 'TD':
                return {
                    title: "Ticket Details",
                    subTitle: "Verify the details and converse further to assist Heldesk to resolve faster."
                }

            default:
                return {
                    title: "Default Title",
                    subTitle: "Default Sub-Title."
                }

        }
    },

    getDefaultInfo: () => {
        return {
            title: "Default Title",
            subTitle: "Default Sub-Title."
        }
    }


}
/***Form Title and SubTitle data END***/



