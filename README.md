<img src='./img/logo.png' width='150'>

# RN Firebase Chat App

## Background

In the evening of 17th June, 2021, I decided that I would attempt another 4 day weekend mobile app building challenge. I wanted to learn how to use firebase's authentication and realtime database with React Native. So I decided I would build a chat app, which requires both technologies, account management and realtime data processing.

This project took approximately 4 days to complete. I worked around 14 to 15 hours a day, so effectively, this project took around 56 to 60 hours. I also spent one extra day to work on the documentation, screenshots, and the README file.

Below includes a detailed breakdown of the areas that I worked on each day.

## Gallery

Below are some screenshots showcasing the app (android)

|        Home (Landing)        |             Chat              |             Chat              |      Friend's Account View      |
| :--------------------------: | :---------------------------: | :---------------------------: | :-----------------------------: |
| <img src='./img/s_home.jpg'> | <img src='./img/s_chat1.jpg'> | <img src='./img/s_chat2.jpg'> | <img src='./img/s_accView.jpg'> |


## Workflow and Schedule

- Day 1
    - Planning
    - Account system logic and UI integration
        - Sign up and sign in
        - Password reset
- Day 2
    - Account details editing
    - Firebase realtime database manipulation
- Day 3
    - "Add Friend" mechanic implementation
        - UID QRCode generation
        - QRCode scanning
        - Pop-up modal design
- Day 4
    - Realtime chat function
    - Added value listeners to account details
    - Release
- Day 5
    - Documentation and readme finalisation

## Technical Details

## More Screenshots

Below are some more screenshots taken from the app (android)

|        Login (Landing)        |         Create Account         |             Sign Up             |        Password Reset         |
| :---------------------------: | :----------------------------: | :-----------------------------: | :---------------------------: |
| <img src='./img/s_login.jpg'> | <img src='./img/s_create.jpg'> | <img src='./img/s_details.jpg'> | <img src='./img/s_reset.jpg'> |

|         My Account          |     Account Detail Editing      |        QRCode Scanner         |       QRCode Generation        |
| :-------------------------: | :-----------------------------: | :---------------------------: | :----------------------------: |
| <img src='./img/s_acc.jpg'> | <img src='./img/s_accEdit.jpg'> | <img src='./img/s_scanner.jpg'> | <img src='./img/s_qrcode.jpg'> |

## Maintenance and Future Updates

As of now, there are no plans to maintain nor further develop this project, as this is only a weekend sprint build.

Althought there is no incentive to do so, the way to app is coded and designed is prepared for future expansion. Data dependency is well managed and minimal (no circular referencing and dependencies). The code base has been abstracted and components are very reusable.

But for those curious people out there who wishes to give it a test, a release .apk is <a href='https://github.com/lochungtin/RNFirebaseChat/releases/tag/v1.0.0'>attached</a> in the release page of this repo.
