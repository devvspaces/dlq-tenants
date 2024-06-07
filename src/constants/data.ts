export const tenants = [
  {
    id: 1,
    name: "Peter David",
    address: "No 1, Akibo Street, YoungPeace State",
    phoneNumber: "0908123458",
    note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatibus nobis ipsum aut voluptas non.",
  },
  {
    id: 2,
    name: "Femi Gbade",
    address: "No 1, Akibo Street, YoungPeace State",
    phoneNumber: "09064223458",
    note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatibus nobis ipsum aut voluptas non.",
  },
  {
    id: 3,
    name: "Oluwadamilare",
    address: "No 1, Akibo Street, YoungPeace State",
    phoneNumber: "0908123458",
    note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatibus nobis ipsum aut voluptas non.",
  },
  {
    id: 4,
    name: "Shola Peace",
    address: "No 1, Akibo Street, YoungPeace State",
    phoneNumber: "0908123458",
    note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatibus nobis ipsum aut voluptas non.",
  },
  {
    id: 5,
    name: "Ayo Semilore",
    address: "No 1, Akibo Street, YoungPeace State",
    phoneNumber: "0908123458",
    note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatibus nobis ipsum aut voluptas non.",
  },
];

export const campaigns = {
  data: [
    {
      id: 1,
      payment_status: "UNPAID",
      commitment_status: null,
      next_call: "2023-10-11T00:00:00.000Z",
      tenant_id: 1,
      user_id: 1,
      conversation_id: 2,
      tenant: {
        first_name: "John",
        last_name: "Dooe",
        address: "Cambridge",
        phone: "+2349056146543",
      },
      conversation: {
        summary:
          "The AI voice bot called the user to discuss their rent balance for May, confirmed the outstanding balance of $1000, and scheduled a follow-up call for Wednesday to confirm the payment.",
      },
    },
    {
      id: 2,
      payment_status: "PAID",
      commitment_status: null,
      next_call: "2023-10-11T00:00:00.000Z",
      tenant_id: 1,
      user_id: 1,
      conversation_id: 2,
      tenant: {
        first_name: "Dele",
        last_name: "Peace",
        address: "Cambridge",
        phone: "+2349056146543",
      },
      conversation: {
        summary:
          "Dammy voice bot called the user to discuss their rent balance for May, confirmed the outstanding balance of $1000, and scheduled a follow-up call for Wednesday to confirm the payment.",
      },
    },
    {
      id: 3,
      payment_status: "PAID",
      commitment_status: null,
      next_call: "2023-10-11T00:00:00.000Z",
      tenant_id: 1,
      user_id: 1,
      conversation_id: 2,
      tenant: {
        first_name: "Joshua",
        last_name: "Olu",
        address: "Cambridge",
        phone: "+2349056146543",
      },
      conversation: {
        summary:
          "Emmy voice bot called the user to discuss their rent balance for May, confirmed the outstanding balance of $1000, and scheduled a follow-up call for Wednesday to confirm the payment.",
      },
    },
  ],
};

export const conversation = [
  {
    speaker: "USER",
    message:
      "Good morning, this is [Agent Name] calling from [Company Name]. May I speak with John Doe, please?",
  },
  { speaker: "JOHN", message: "Yes, this is John." },
  {
    speaker: "USER",
    message:
      "Hello, John. I'm calling regarding your outstanding rent payment for the month of May. Our records show that your payment of $1,200 is now 10 days past due. Can you please provide an update on when we can expect to receive your payment?",
  },
  {
    speaker: "JOHN",
    message:
      "I apologize for the delay. I've been experiencing some financial difficulties due to unexpected medical expenses. However, I should be receiving my insurance reimbursement by the end of this week. I can make the full payment by Friday, May 19th.",
  },
  {
    speaker: "USER",
    message:
      "I understand, John. Unexpected expenses can certainly make things challenging. If you're able to make the full payment by this Friday, that would be greatly appreciated. Please let me know if there are any further delays or issues.",
  },
  {
    speaker: "JOHN",
    message:
      "Absolutely, I will keep you updated. Thank you for your understanding.",
  },
  {
    speaker: "USER",
    message:
      "You're welcome, John. We appreciate your cooperation. If you have any other questions or concerns, feel free to reach out. Have a great day.",
  },
];

export const convoData = {
  id: 1,
  payment_status: "UNPAID",
  commitment_status: null,
  next_call: "2023-10-11T00:00:00.000Z",
  tenant_id: 1,
  user_id: 1,
  conversation_id: 2,
  conversation: {
    id: 2,
    date: "2024-05-29T09:52:58.830Z",
    summary:
      "The AI voice bot called the user to discuss their rent balance for May, confirmed the outstanding balance of $1000, and scheduled a follow-up call for Wednesday to confirm the payment.",
    transcript: [
      {
        role: "agent",
        content:
          "Hi, this is NetrobeWeb PyUniverse calling about your rent balance for the month of May. Can we discuss your payment?",
      },
      {
        role: "user",
        content: "Yes. You can discuss my payment.",
      },
      {
        role: "agent",
        content:
          "Let's check your outstanding balance for May.Your outstanding balance for May is $1000. When can you commit to making the payment?",
      },
      {
        role: "user",
        content: "Message Wednesday.",
      },
      {
        role: "agent",
        content:
          "Great! You mentioned Wednesday. Let's schedule a follow-up call for Wednesday to confirm the payment. Does that work for you?",
      },
      {
        role: "user",
        content: "Yes. It talks to me.",
      },
      {
        role: "agent",
        content:
          "Perfect! I'll call you on Wednesday to confirm the payment. Have a great day!",
      },
    ],
  },
  tenant: {
    id: 1,
    first_name: "John",
    last_name: "Dooe",
    address: "Cambridge",
    phone: "+2349056146543",
    amount: "1000",
    amount_paid: "0",
    outstanding_balance: "1000",
    start_date: "2024-01-02T23:00:00.000Z",
    due_date: "2024-10-09T23:00:00.000Z",
    commitment_date: null,
    current_year: 2024,
    history: {},
    user_id: 1,
  },
};

export const prompts = [
  {
    label: "AI prompt 1",
  },
  {
    label: "AI prompt 2",
  },
  {
    label: "AI prompt 3",
  },
];

export const voices = [
  {
    label: "AI Voice 1",
  },
  {
    label: "AI Voice 2",
  },
  {
    label: "AI Voice 3",
  },
];

export const sheets = [
  {
    label: "Google Sheet 1",
  },
  {
    label: "Google Sheet 2",
  },
  {
    label: "Google Sheet 3",
  },
];

export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];
