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
export const SortOrder = {
    ASCENDING: 'ascending', DESCENDING: 'descending'
}

export const TicketsSortBy = {
    TICKET_ID: 'ticketId', TICKET_STATUS: 'ticketStatus', TICKET_UPDATED_DATE: 'ticketUpdatedDate',
    TICKET_TITLE: 'ticketTitle'

}

export const TicketStatus = {
    OPEN: 'Open', CLOSE: 'Closed', NEW: 'New', IN_PROCESS: 'Processing', PENDING: 'Pending',
    AWAIT_RESPONSE: 'AwaitingResponse', ALL: 'all'
};

export const TicketStatusCode = {
    IN_PROCESS: 1, PENDING: 2, NEW: 3, CLOSE: 4, OPEN: 5, AWAIT_RESPONSE: 6
};

export const glbColorCodes = {
    MUTED: 'muted', PRIMARY: 'primary', SUCCESS: 'success', INFO: 'info', WARNING: 'warning',
    DANGER: 'danger', WHITE: 'white', DARK: 'dark', LIGHT: 'light', SECONDARY: 'secondary'
}

export const TicketStatusColorCode = {
    OPEN: glbColorCodes.WARNING, CLOSE: glbColorCodes.INFO, NEW: glbColorCodes.PRIMARY, IN_PROCESS: glbColorCodes.PRIMARY,
    PENDING: glbColorCodes.DANGER, AWAIT_RESPONSE: glbColorCodes.SUCCESS
}

export const TicketPriorityColorCode = {
    HIGH: glbColorCodes.DANGER, MEDIUM: glbColorCodes.WARNING, LOW: glbColorCodes.INFO
}

export const TICKETS_PER_PAGE_EMPLOYEE = 3;
export const TICKETS_PER_PAGE_MANAGER = 5;
export const TICKETS_PER_PAGE_ENGINEER = 5;

export const PAGINATION_START_PAGE = 1;




/***Form Title and SubTitle data START***/
export const componentInfoObj = {
    getInfo: (key) => {
        switch (key) {
            case 'PRF':
                return {
                    title: "My Profile",
                    subTitle: "Please verify your profile details and update if you should.",
                    createdByMe:false
                }
            case 'AST':
                return {
                    title: "Assigned Tickets",
                    subTitle: "Tickets that need to be actioned. Action based on priority and severity.",
                    statusFilterValue: TicketStatus.NEW,
                    createdByMe:false
                }

            case 'NT':
                return {
                    title: 'Create Ticket',
                    subTitle: 'Raise and provide as much as information for speedy resolution.',
                    createdByMe:false
                }

            case 'CLT':
                return {
                    title: "Closed Tickets",
                    subTitle: "Reopen if any of the tickets is not resolved.",
                    statusFilterValue: TicketStatus.CLOSE,
                    createdByMe:false
                }

            case 'ALT':
                return {
                    title: "All Tickets",
                    subTitle: "Monitor your ticket activity and update Tickets that need your response.",
                    statusFilterValue: TicketStatus.ALL,
                    createdByMe:false
                }

            case 'MT':
                return {
                    title: "My Tickets",
                    subTitle: "Monitor ticket activity across organization and update Tickets that need your response.",
                    createdByMe:true
                }

            case 'AWT':
                return {
                    title: "Awaiting Response Tickets",
                    subTitle: "Contact respective employee if no response provided beyond certain time limit.",
                    createdByMe:false
                }

            case 'MDB':
                return {
                    title: "Dashboard",
                    subTitle: "Organization wide Ticket-Dynamics to take informed decisions.",
                    createdByMe:false
                }

            case 'ENDB':
                return {
                    title: "My Board",
                    subTitle: "Your credits, badges etc. Update the profile if need be.",
                    createdByMe:false
                }

            case 'TD':
                return {
                    title: "Ticket Details",
                    subTitle: "Verify the details and converse further to assist Heldesk to resolve faster.",
                    createdByMe:false
                }

            default:
                return {
                    title: "Default Title",
                    subTitle: "Default Sub-Title.",
                    createdByMe:false
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
        answer: 'No.'

    }, {
        question: 'Is there a limit on the number of tickets that a user can create?',
        answer: 'No.'

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
/***HomePage-PreLogin data START***/
export const subHeading1 = 'This is a helpdesk software for organizations to assist employees of their IT Infrastructure needs such as - Software, Hardward and Network etc. In addition, it provides deep info-graphics on the support activities at organizational level to enable IT Managers to make informed decisions on a timely basis.'
export const subHeading2 = 'The software is feature-full. It already accommodates decent number of Industry standard must-have features and still growing in number. The striking aspect of ItsHelpdesk is its simplistic design. The whole application can be looked at from 3 major views - Creator, Resolver and Manager. The UI/UX and the functionality across these roles have been kept consistent. State-of-the-art tools and technologies are used in making of this product with a solid architecture at its base. Being stable, powerful and continuously evolving, the software can be definitely termed as Trendy.';
export const raiseTicket = 'Raise a ticket if you have pressing IT need. Thats it. Provide the ample information and leave the rest of it to be taken care by Engineer. You will be notified when its addressed.';
export const resolveTicket = 'Single Page window design with all the necessary information along with embedded mail drafting and self-ticket-assignment facility to assist Engineer expedite the resolution path.';
export const ticketAnalytics = 'Deep info-graphics to assist in every aspect of organizational trends of IT requirements. Stay ahead of the issues and plan efficiently.';
/***HomePage-PreLogin data END***/

/***Common for all pages START*/
export const footerText = '2019-2020 ITSHelpDesk - Powered By PMAPI - Helpdesk Software'
/***Common for all pages END*/

/***Messages for all modules START*/
export const applicationMessages = {
    errorMessages:{
        LOGIN_FAILURE: '',
        TICKET_CREATION_FAILURE: 'Ticket creation failed. Please try again after sometime.',
        TICKET_UPDATE_FAILURE: 'Updated ticket failed. Please try again after sometime.'
    },

    successMessages: {
        TICKET_CREATION_SUCCESS: 'Ticket created successfully.',
        TICKET_UPDATE_SUCCESS: 'Ticket updated successfully.'
    },

    messageHeaders:{
        TICKET_CREATION_SUCCESS: 'SUCCESS',
        TICKET_UPDATE_SUCCESS : 'SUCCESS'

    }

}
/***Messages for all modules END*/





