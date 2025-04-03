# System Design: Substrack

## A. Functional Requirement
1. Users can **add** a new subscription item.
2. Users can **stop** the subscription.
3. Users can **modify** the subscription item.
4. Users can **get useful insights** from the subscriptions.
   1. Stacked bar chart of the subscription bills per month/year
   2. Pie chart of the subscription categories distribution (per month/year)
   3. Calendar view of the subscription bills due dates
   4. Table view of the upcoming bills with nearest due date

### A.1. Out of Scope
1. Users will not get any notifications.
2. There is no payment integration. This app will be used only for tracking the user subscriptions.

## B. Non-Functional Requirements
1. **Low Latency**
   1. The subscription data table should load fast (~100ms)
   2. The creation/modificaton/deletion of any subscription item should be executed fast (~100ms)

2. **High Availability**
The system should be available 24/7 with minimum downtime.

3. **Eventual Consistency**
   - The user's subscription data is accessible only be the user itself.
   - Usually the user will open the app only in one device at a time.
   - Hence, realtime update on other user's devices is not necessary.

4. **High Durability**
All user's subscription items, including the paid ones, shouldn't be lost as the data will be used for displaying insightful dashboard.

5. **Read-heavy**
The primary goal of the subscription tracker app is to help users track, monitor, and evaluate their subscriptions. This inherently makes the app read-heavy, as users will **frequently access their subscription data to review their spending and insights**.