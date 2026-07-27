// Generated from the design prototype project/Admin.dc.html
// by scripts/extract-admin.mjs — mock data, verbatim from the approved design.
//
// This is demo content for a UX prototype. It lives in memory and resets on
// reload; the design bundle's Blueprint (section 09) recommends an
// off-the-shelf CMS + CRM rather than building this backend from scratch.

export const STAGES = {
  "new": {
    "label": "New",
    "bg": "#F7EBED",
    "color": "#A31631",
    "col": "#A31631"
  },
  "contacted": {
    "label": "Contacted",
    "bg": "#FBF0E4",
    "color": "#B5702A",
    "col": "#C98A3A"
  },
  "consultation": {
    "label": "Consultation",
    "bg": "#E9F0E4",
    "color": "#5E7A3E",
    "col": "#7A9A5B"
  },
  "client": {
    "label": "Client",
    "bg": "#E4EBF0",
    "color": "#3E5E7A",
    "col": "#5B7A9A"
  },
  "lost": {
    "label": "Lost",
    "bg": "#F0ECEA",
    "color": "#9A9089",
    "col": "#B0A79F"
  }
} as const;

export const OWNERS = [
  "Unassigned",
  "Ari Wibowo",
  "Sinta Halim",
  "Budi Santoso",
  "Rina Wijaya"
];

export const SERVICE_NAMES = [
  "Audit & Assurance",
  "Tax",
  "PT PMA Establishment",
  "Accounting",
  "Payroll",
  "Corporate Finance",
  "Transfer Pricing",
  "Advisory",
  "ESG & Sustainability",
  "Digital Solutions"
];

export const ROLE_OPTIONS = [
  "Administrator",
  "Editor",
  "Consultant"
];

export const RESOURCE_TYPES = [
  "GUIDE · PDF",
  "CHECKLIST",
  "WHITEPAPER",
  "WEBINAR"
];

export const BLOCK_PALETTE = [
  {
    "type": "Heading",
    "label": "Heading"
  },
  {
    "type": "Paragraph",
    "label": "Text"
  },
  {
    "type": "Image",
    "label": "Image"
  },
  {
    "type": "Quote",
    "label": "Quote"
  },
  {
    "type": "CTA band",
    "label": "CTA"
  },
  {
    "type": "Stat grid",
    "label": "Stats"
  }
];

export const SEO_DEFAULTS = {
  "title": "%page% · Ecovis Indonesia — Audit, Tax & PMA",
  "desc": "Global ECOVIS expertise delivered by licensed local partners — integrated audit, tax and company setup in Indonesia."
};

export const SEED = {
  "leads": [
    {
      "id": 1,
      "name": "James Whitfield",
      "company": "Harborline Logistics (UK)",
      "email": "j.whitfield@harborline.co.uk",
      "phone": "+44 20 7946 0102",
      "service": "PT PMA Establishment",
      "stage": "new",
      "assigned": "Unassigned",
      "value": 45000000,
      "source": "Organic — PMA guide",
      "priority": "high",
      "ago": "2h ago",
      "followUp": "",
      "message": "We are a UK logistics group planning a Jakarta subsidiary. Need guidance on minimum capital, OSS licensing and a timeline to operate before Q4.",
      "notes": []
    },
    {
      "id": 2,
      "name": "Dewi Kartika",
      "company": "Nusantara Retail Group",
      "email": "dewi@nusantararetail.co.id",
      "phone": "+62 811 2345 678",
      "service": "Audit & Assurance",
      "stage": "new",
      "assigned": "Unassigned",
      "value": 28000000,
      "source": "Organic — audit page",
      "priority": "medium",
      "ago": "5h ago",
      "followUp": "",
      "message": "Board requires a statutory audit for FY2025 ahead of a bank facility renewal. What is your scope and fee estimate?",
      "notes": []
    },
    {
      "id": 3,
      "name": "Michael Tan",
      "company": "Sapphire Ventures (SG)",
      "email": "m.tan@sapphire.sg",
      "phone": "+65 6123 4567",
      "service": "Tax",
      "stage": "contacted",
      "assigned": "Sinta Halim",
      "value": 36000000,
      "source": "Referral — ECOVIS SG",
      "priority": "high",
      "ago": "1d ago",
      "followUp": "2026-07-21",
      "message": "Cross-border structuring question on withholding tax and the new Coretax e-Faktur migration for our Indonesian entity.",
      "notes": [
        {
          "author": "Sinta Halim",
          "text": "Called — sent intro deck and Tax 2026 guide. Wants a call next week.",
          "time": "Yesterday 16:20",
          "initials": "SH",
          "bg": "#A31631"
        }
      ]
    },
    {
      "id": 4,
      "name": "Anita Prawira",
      "company": "GreenField Agritech",
      "email": "anita@greenfield.id",
      "phone": "+62 812 9988 776",
      "service": "Transfer Pricing",
      "stage": "contacted",
      "assigned": "Budi Santoso",
      "value": 52000000,
      "source": "LinkedIn",
      "priority": "medium",
      "ago": "2d ago",
      "followUp": "2026-07-20",
      "message": "Need TP documentation for related-party transactions with our Netherlands parent. Deadline is tax filing season.",
      "notes": [
        {
          "author": "Budi Santoso",
          "text": "Scoping call done. Awaiting their intercompany agreements.",
          "time": "2d ago",
          "initials": "BS",
          "bg": "#3E5E7A"
        }
      ]
    },
    {
      "id": 5,
      "name": "Robert Klein",
      "company": "Klein Manufacturing GmbH",
      "email": "r.klein@kleinmfg.de",
      "phone": "+49 30 1234 567",
      "service": "PT PMA Establishment",
      "stage": "consultation",
      "assigned": "Ari Wibowo",
      "value": 68000000,
      "source": "Organic — PMA guide",
      "priority": "high",
      "ago": "3d ago",
      "followUp": "2026-07-18",
      "message": "German manufacturer setting up assembly in Bekasi. Consultation booked, needs full setup + payroll + accounting bundle.",
      "notes": [
        {
          "author": "Ari Wibowo",
          "text": "Consultation scheduled Fri 10:00. Preparing PMA + payroll proposal.",
          "time": "3d ago",
          "initials": "AW",
          "bg": "#6E1423"
        }
      ]
    },
    {
      "id": 6,
      "name": "Siti Rahmawati",
      "company": "Bahari Seafood Export",
      "email": "siti@baharisea.co.id",
      "phone": "+62 813 4455 667",
      "service": "Tax",
      "stage": "consultation",
      "assigned": "Sinta Halim",
      "value": 22000000,
      "source": "Google Business",
      "priority": "low",
      "ago": "4d ago",
      "followUp": "2026-07-19",
      "message": "Facing a DJP tax audit on export VAT refunds. Need representation and dispute support.",
      "notes": []
    },
    {
      "id": 7,
      "name": "David Osei",
      "company": "Meridian Capital Partners",
      "email": "d.osei@meridiancap.com",
      "phone": "+1 212 555 0143",
      "service": "Corporate Finance",
      "stage": "client",
      "assigned": "Ari Wibowo",
      "value": 95000000,
      "source": "Referral — network",
      "priority": "high",
      "ago": "1w ago",
      "followUp": "",
      "message": "Due diligence support for an acquisition of an Indonesian target. Engagement signed.",
      "notes": [
        {
          "author": "Ari Wibowo",
          "text": "Engagement letter signed. Kickoff Monday.",
          "time": "5d ago",
          "initials": "AW",
          "bg": "#6E1423"
        }
      ]
    },
    {
      "id": 8,
      "name": "Lin Mei",
      "company": "Golden Lotus F&B",
      "email": "lin.mei@goldenlotus.id",
      "phone": "+62 815 2233 445",
      "service": "Accounting",
      "stage": "client",
      "assigned": "Rina Wijaya",
      "value": 18000000,
      "source": "Direct",
      "priority": "medium",
      "ago": "1w ago",
      "followUp": "",
      "message": "Monthly bookkeeping + payroll outsourcing for 3 restaurant entities. Onboarded.",
      "notes": []
    },
    {
      "id": 9,
      "name": "Thomas Berg",
      "company": "Nordic Solar AS",
      "email": "t.berg@nordicsolar.no",
      "phone": "+47 22 33 44 55",
      "service": "ESG & Sustainability",
      "stage": "new",
      "assigned": "Unassigned",
      "value": 31000000,
      "source": "Insights article",
      "priority": "medium",
      "ago": "6h ago",
      "followUp": "",
      "message": "Interested in ESG reporting and sustainability assurance for our Indonesian solar operations.",
      "notes": []
    }
  ],
  "articles": [
    {
      "id": 1,
      "title": "Coretax e-Faktur migration: what businesses must do in 2026",
      "category": "Tax",
      "author": "Sinta Halim",
      "date": "12 Jul 2026",
      "views": "2,410",
      "published": true,
      "slug": "coretax-efaktur-2026"
    },
    {
      "id": 2,
      "title": "How to set up a PT PMA in Indonesia: step-by-step 2026",
      "category": "PMA",
      "author": "Ari Wibowo",
      "date": "8 Jul 2026",
      "views": "5,120",
      "published": true,
      "slug": "pt-pma-setup-2026"
    },
    {
      "id": 3,
      "title": "Statutory audit readiness checklist for foreign subsidiaries",
      "category": "Audit",
      "author": "Budi Santoso",
      "date": "2 Jul 2026",
      "views": "1,880",
      "published": true,
      "slug": "audit-readiness-checklist"
    },
    {
      "id": 4,
      "title": "VAT 12%: transition rules and invoicing changes",
      "category": "Tax",
      "author": "Sinta Halim",
      "date": "—",
      "views": "0",
      "published": false,
      "slug": "vat-12-transition"
    },
    {
      "id": 5,
      "title": "Transfer pricing documentation deadlines explained",
      "category": "TP",
      "author": "Anita R.",
      "date": "—",
      "views": "0",
      "published": false,
      "slug": "tp-documentation-deadlines"
    }
  ],
  "pageList": [
    {
      "id": 1,
      "title": "Home",
      "url": "/",
      "slug": "home",
      "blocks": 12,
      "pub": true
    },
    {
      "id": 2,
      "title": "About",
      "url": "/about",
      "slug": "about",
      "blocks": 7,
      "pub": true
    },
    {
      "id": 3,
      "title": "Services (Hub)",
      "url": "/services",
      "slug": "services",
      "blocks": 9,
      "pub": true
    },
    {
      "id": 4,
      "title": "Audit & Assurance",
      "url": "/audit",
      "slug": "audit",
      "blocks": 8,
      "pub": true
    },
    {
      "id": 5,
      "title": "Tax",
      "url": "/tax",
      "slug": "tax",
      "blocks": 8,
      "pub": true
    },
    {
      "id": 6,
      "title": "PT PMA Establishment",
      "url": "/pt-pma",
      "slug": "pt-pma",
      "blocks": 10,
      "pub": true
    },
    {
      "id": 7,
      "title": "Industries",
      "url": "/industries",
      "slug": "industries",
      "blocks": 6,
      "pub": true
    },
    {
      "id": 8,
      "title": "Contact",
      "url": "/contact",
      "slug": "contact",
      "blocks": 4,
      "pub": true
    },
    {
      "id": 9,
      "title": "Careers",
      "url": "/careers",
      "slug": "careers",
      "blocks": 5,
      "pub": false
    }
  ],
  "resources": [
    {
      "id": 1,
      "type": "GUIDE · PDF",
      "title": "Setting up a PT PMA in Indonesia 2026",
      "downloads": 1240,
      "leads": 412,
      "gated": true
    },
    {
      "id": 2,
      "type": "GUIDE · PDF",
      "title": "Tax Calendar & Changes 2026",
      "downloads": 980,
      "leads": 331,
      "gated": true
    },
    {
      "id": 3,
      "type": "CHECKLIST",
      "title": "Annual Audit Readiness Checklist",
      "downloads": 640,
      "leads": 188,
      "gated": true
    },
    {
      "id": 4,
      "type": "WHITEPAPER",
      "title": "Transfer Pricing Documentation Guide",
      "downloads": 420,
      "leads": 96,
      "gated": true
    },
    {
      "id": 5,
      "type": "GUIDE · PDF",
      "title": "Payroll & BPJS Compliance Handbook",
      "downloads": 310,
      "leads": 74,
      "gated": false
    },
    {
      "id": 6,
      "type": "WEBINAR",
      "title": "Navigating Coretax: Live Q&A Recording",
      "downloads": 560,
      "leads": 140,
      "gated": true
    }
  ],
  "services": [
    {
      "id": 1,
      "name": "Audit & Assurance",
      "tagline": "Statutory & special-purpose audit",
      "priority": true,
      "leads": 32
    },
    {
      "id": 2,
      "name": "Tax",
      "tagline": "Compliance, planning & disputes",
      "priority": true,
      "leads": 41
    },
    {
      "id": 3,
      "name": "PT PMA Establishment",
      "tagline": "Setup, licensing & secretarial",
      "priority": true,
      "leads": 58
    },
    {
      "id": 4,
      "name": "Accounting",
      "tagline": "Bookkeeping & reporting",
      "priority": false,
      "leads": 18
    },
    {
      "id": 5,
      "name": "Payroll",
      "tagline": "Payroll & BPJS outsourcing",
      "priority": false,
      "leads": 12
    },
    {
      "id": 6,
      "name": "Corporate Finance",
      "tagline": "M&A, due diligence, valuation",
      "priority": false,
      "leads": 9
    },
    {
      "id": 7,
      "name": "Transfer Pricing",
      "tagline": "TP documentation & policy",
      "priority": false,
      "leads": 14
    },
    {
      "id": 8,
      "name": "Advisory",
      "tagline": "Business & risk advisory",
      "priority": false,
      "leads": 7
    },
    {
      "id": 9,
      "name": "ESG & Sustainability",
      "tagline": "Reporting & assurance",
      "priority": false,
      "leads": 6
    },
    {
      "id": 10,
      "name": "Digital Solutions",
      "tagline": "Accounting tech & automation",
      "priority": false,
      "leads": 4
    }
  ],
  "industries": [
    {
      "id": 1,
      "name": "Manufacturing",
      "pages": 3
    },
    {
      "id": 2,
      "name": "Financial Services",
      "pages": 2
    },
    {
      "id": 3,
      "name": "Technology & Startups",
      "pages": 2
    },
    {
      "id": 4,
      "name": "Retail & Consumer",
      "pages": 2
    },
    {
      "id": 5,
      "name": "Energy & Resources",
      "pages": 2
    },
    {
      "id": 6,
      "name": "Real Estate & Construction",
      "pages": 2
    }
  ],
  "jobs": [
    {
      "id": 1,
      "role": "Senior Tax Consultant",
      "dept": "Tax",
      "location": "Jakarta",
      "applicants": 18,
      "open": true
    },
    {
      "id": 2,
      "role": "Audit Associate",
      "dept": "Audit",
      "location": "Jakarta",
      "applicants": 34,
      "open": true
    },
    {
      "id": 3,
      "role": "PMA Setup Specialist",
      "dept": "Corporate Services",
      "location": "Jakarta / Remote",
      "applicants": 12,
      "open": true
    },
    {
      "id": 4,
      "role": "Payroll Officer",
      "dept": "Outsourcing",
      "location": "Surabaya",
      "applicants": 7,
      "open": true
    },
    {
      "id": 5,
      "role": "Marketing Content Lead",
      "dept": "Marketing",
      "location": "Jakarta",
      "applicants": 9,
      "open": false
    }
  ],
  "media": [
    {
      "id": 1,
      "name": "team-partner-ari.jpg",
      "kind": "JPG",
      "size": "1.2 MB",
      "bg": "#6E1423"
    },
    {
      "id": 2,
      "name": "ecovis-office-jakarta.jpg",
      "kind": "JPG",
      "size": "2.4 MB",
      "bg": "#3E5E7A"
    },
    {
      "id": 3,
      "name": "pma-guide-cover.png",
      "kind": "PNG",
      "size": "480 KB",
      "bg": "#A31631"
    },
    {
      "id": 4,
      "name": "audit-hero.jpg",
      "kind": "JPG",
      "size": "1.8 MB",
      "bg": "#5E7A3E"
    },
    {
      "id": 5,
      "name": "tax-calendar-2026.pdf",
      "kind": "PDF",
      "size": "620 KB",
      "bg": "#B5702A"
    },
    {
      "id": 6,
      "name": "network-map.svg",
      "kind": "SVG",
      "size": "88 KB",
      "bg": "#26282B"
    },
    {
      "id": 7,
      "name": "client-logos.png",
      "kind": "PNG",
      "size": "340 KB",
      "bg": "#5B7A9A"
    },
    {
      "id": 8,
      "name": "webinar-thumb.jpg",
      "kind": "JPG",
      "size": "910 KB",
      "bg": "#8E2136"
    },
    {
      "id": 9,
      "name": "annual-report.pdf",
      "kind": "PDF",
      "size": "3.1 MB",
      "bg": "#4E0D19"
    }
  ],
  "subscribers": [
    {
      "id": 1,
      "email": "j.whitfield@harborline.co.uk",
      "segment": "PMA / Foreign",
      "source": "PMA guide",
      "joined": "2h ago"
    },
    {
      "id": 2,
      "email": "dewi@nusantararetail.co.id",
      "segment": "Audit",
      "source": "Audit page",
      "joined": "5h ago"
    },
    {
      "id": 3,
      "email": "cfo@meridiancap.com",
      "segment": "Corporate Finance",
      "source": "Referral",
      "joined": "1d ago"
    },
    {
      "id": 4,
      "email": "finance@greenfield.id",
      "segment": "Transfer Pricing",
      "source": "LinkedIn",
      "joined": "2d ago"
    },
    {
      "id": 5,
      "email": "ops@nordicsolar.no",
      "segment": "ESG",
      "source": "Insights",
      "joined": "2d ago"
    },
    {
      "id": 6,
      "email": "admin@baharisea.co.id",
      "segment": "Tax",
      "source": "Google",
      "joined": "4d ago"
    },
    {
      "id": 7,
      "email": "hello@goldenlotus.id",
      "segment": "Accounting",
      "source": "Direct",
      "joined": "5d ago"
    },
    {
      "id": 8,
      "email": "invest@sapphire.sg",
      "segment": "Tax",
      "source": "Newsletter form",
      "joined": "1w ago"
    }
  ],
  "team": [
    {
      "id": 1,
      "name": "Ari Wibowo",
      "title": "Managing Partner",
      "cred": "Licensed Public Accountant (CPA) · IAPI member",
      "bg": "#6E1423",
      "leads": 4
    },
    {
      "id": 2,
      "name": "Sinta Halim",
      "title": "Tax Partner",
      "cred": "Registered Tax Consultant (BKP) · Brevet C",
      "bg": "#A31631",
      "leads": 3
    },
    {
      "id": 3,
      "name": "Budi Santoso",
      "title": "Audit Partner",
      "cred": "CPA · 18 years assurance experience",
      "bg": "#3E5E7A",
      "leads": 2
    },
    {
      "id": 4,
      "name": "Rina Wijaya",
      "title": "Head of Accounting",
      "cred": "CA · Outsourcing & payroll lead",
      "bg": "#5E7A3E",
      "leads": 1
    },
    {
      "id": 5,
      "name": "Daniel Osei",
      "title": "Corporate Finance Director",
      "cred": "CFA · M&A and valuation",
      "bg": "#B5702A",
      "leads": 1
    },
    {
      "id": 6,
      "name": "Maya Sari",
      "title": "Marketing Manager",
      "cred": "Content, SEO & demand generation",
      "bg": "#5B7A9A",
      "leads": 0
    }
  ],
  "integrations": [
    {
      "id": 1,
      "abbr": "GA4",
      "name": "Google Analytics 4",
      "desc": "Traffic & conversion tracking",
      "on": true
    },
    {
      "id": 2,
      "abbr": "GSC",
      "name": "Google Search Console",
      "desc": "Search performance & indexing",
      "on": true
    },
    {
      "id": 3,
      "abbr": "ML",
      "name": "Mailchimp",
      "desc": "Newsletter & nurture sequences",
      "on": true
    },
    {
      "id": 4,
      "abbr": "CT",
      "name": "Coretax export",
      "desc": "e-Faktur / tax data bridge",
      "on": false
    }
  ],
  "aiProviders": [
    {
      "id": "anthropic",
      "name": "Anthropic Claude",
      "short": "Anthropic",
      "abbr": "AN",
      "color": "#B5702A",
      "docs": "sk-ant-api03-...",
      "models": [
        "claude-sonnet-4-5",
        "claude-opus-4-1",
        "claude-haiku-4-5"
      ],
      "model": "claude-sonnet-4-5",
      "key": "",
      "on": true
    },
    {
      "id": "openai",
      "name": "OpenAI",
      "short": "OpenAI",
      "abbr": "AI",
      "color": "#5E7A3E",
      "docs": "sk-proj-...",
      "models": [
        "gpt-4o",
        "gpt-4o-mini",
        "gpt-4.1"
      ],
      "model": "gpt-4o",
      "key": "",
      "on": true
    },
    {
      "id": "deepseek",
      "name": "DeepSeek",
      "short": "DeepSeek",
      "abbr": "DS",
      "color": "#3E5E7A",
      "docs": "sk-...",
      "models": [
        "deepseek-chat",
        "deepseek-reasoner"
      ],
      "model": "deepseek-chat",
      "key": "",
      "on": false
    },
    {
      "id": "grok",
      "name": "Grok · xAI",
      "short": "Grok",
      "abbr": "GK",
      "color": "#26282B",
      "docs": "xai-...",
      "models": [
        "grok-4",
        "grok-3",
        "grok-3-mini"
      ],
      "model": "grok-4",
      "key": "",
      "on": false
    },
    {
      "id": "kimi",
      "name": "Kimi · Moonshot",
      "short": "Kimi",
      "abbr": "KM",
      "color": "#8E2136",
      "docs": "sk-...",
      "models": [
        "kimi-k2",
        "moonshot-v1-128k",
        "moonshot-v1-32k"
      ],
      "model": "kimi-k2",
      "key": "",
      "on": false
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "Ari Wibowo",
      "email": "ari@ecovisindonesia.com",
      "role": "Administrator",
      "active": "Now",
      "status": "Active"
    },
    {
      "id": 2,
      "name": "Maya Sari",
      "email": "maya@ecovisindonesia.com",
      "role": "Editor",
      "active": "12m ago",
      "status": "Active"
    },
    {
      "id": 3,
      "name": "Sinta Halim",
      "email": "sinta@ecovisindonesia.com",
      "role": "Consultant",
      "active": "1h ago",
      "status": "Active"
    },
    {
      "id": 4,
      "name": "Budi Santoso",
      "email": "budi@ecovisindonesia.com",
      "role": "Consultant",
      "active": "3h ago",
      "status": "Active"
    },
    {
      "id": 5,
      "name": "Webweaver Agency",
      "email": "dev@webweaver.co",
      "role": "Editor",
      "active": "2d ago",
      "status": "Invited"
    }
  ]
};
