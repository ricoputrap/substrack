# Data Model

## Subscription

| Field | Type | Description | Unique | Required |
|-------|------|-------------|--------|----------|
| id | Integer | Unique identifier for the subscription | Yes | Yes |
| name | String | Name of the subscription item | No | Yes |
| frequency | Integer | Frequency of the subscription (0: Once, 1: Monthly, 2: Quarterly, 3: Annually) | No | Yes |
| due_date | Date | Next due date of the subscription | No | Yes |
| price | Float | Price of the subscription | No | Yes |
| status | Integer | Status of the subscription (0: Unpaid, 1: Paid, 2: Cancelled) | No | Yes |

## Category

| Field | Type | Description | Unique | Required |
|-------|------|-------------|--------|----------|
| id | Integer | Unique identifier for the category | Yes | Yes |
| name | String | Name of the category | No | Yes |

## User

| Field | Type | Description | Unique | Required |
|-------|------|-------------|--------|----------|
| id | Integer | Unique identifier for the user | Yes | Yes |
| full_name | String | Full name of the user | No | Yes |
| email | String | Email address of the user | Yes | Yes |
| password | String | Password for user authentication | No | Yes |
| profile_picture | String | URL of the user's profile picture | No | No |
| currency | String | Currency preference of the user | No | No |
| language | String | Language preference of the user | No | No |
| theme | String | Theme preference of the user (light or dark) | No | No |
