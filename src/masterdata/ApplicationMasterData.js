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

/***FAQs data START***/
export const faqs = [
    {
        question: 'Can the ticket be Reoped once it is closed?',
        answer: 'No. There is ample time provided for the requester to respond before it is auto-closed. Please raise a new ticket if it is not resolved.'

    },
    {
        question: 'Is there a limit on the number of tickets to be assigned to Engineer?',
        answer: 'No'

    }, {
        question: 'Is there a limit on the number of tickets that a user can create?',
        answer: 'No'

    },
    {
        question: 'Can I escalate the issue if not resolved?',
        answer: 'Feature will be available in upcoming releases.'

    },
    {
        question: 'How to know the stage of my Ticket?',
        answer: 'Please refer to the Workflow.'

    },
    {
        question: 'Can I send an email to create a ticket rather than from NewTicket link?',
        answer: 'Feature will be availble in future releases.'

    },
    {
        question: 'Can an Engineer assign ticket to other Engineers?',
        answer: 'Yes. This is to speed up the process of resolution. Also, the Engineer can assign a ticket to him/herself without waiting for Manager to assign the same.'

    },
    {
        question: 'Can I use the software for any sort of legal formalities?',
        answer: 'No. The ItsHelpDesk is strictly intended for the purposes of collaboration and does not stand as any form of legal formlities.'

    },
    {
        question: 'Is the software operational in Intranet or Internet?',
        answer: 'Depends on the organizational security aspects.'

    },
    {
        question: 'What if I find a discrepancy in the graphs visisble to a Manger?',
        answer: 'Kindly report the issue to admin@itshelpdesk.com'

    }];


/***FAQs data END***/





