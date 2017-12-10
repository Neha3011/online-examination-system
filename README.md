## Online Examination System
This is a very basic demo app, to imitate an online examination system.
There can be 2 types of users:
1) Author: 
Author can perform following actions:
    a. can add questions. There can be MCQ, Submission & Passage type of question.
    b. can assign questions to students

2) Student:
Student can perform following actions:
    b. can view assigned questions by the author

### Follow steps to run the project

```sh
1) git clone https://github.com/Neha3011/online-examination-system.git
2) npm install
3) npm start (to develop locally)
```

### To run the unit test with coverage, execute the following commands

```sh
1) npm run test
2) npm run coverage
```

### To run the linter (airbnb), execute the following command

```sh
1) npm run lint
```

### steps to deploy on github pages

```sh
1) git checkout master
2) git up
3) rm -rf dist
4) npm run build:prod
5) git subtree push --prefix dist origin gh-pages
```