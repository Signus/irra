# IRRA
IRRA stands for Incident Response Readiness Assessment, and is built as a questionnaire system to quantitatively determine whether organizations are prepared for incidents.

### Organization
IRRA is built with a structure in mind to assess "areas" in which organizations are prepared. The core components of IRRA are:

  - **Domains:** Hierarchical component defining an area of knowledge, composed of topics
  - **Topics:** Component defining subjects, composed of subtopics (e.g. Training)
  - **Subtopics:** Component defining secondary subjects, composed of questions (e.g. User Training)
  - **Questions:** Yes or no questions that answer whether an organization has controls around particular components (e.g. "Are there processes implemented for managing cryptographic keys?")
  
The structure is organized as follows (currently JSON):
  - Domains
    - Topics
      - Subtopics
        - Questions

### Installation
IRRA is currently a single page application utilizing AngularJS, Node.js, and Express.js. All packages are specified in the `package.json` file and all that is required to install is `npm install`.

It is highly suggested to use the `nodemon` package if you intend to modify the application, otherwise you may simply run `node server.js`

```sh
git clone https://github.com/Signus/irra
cd irra
npm install
nodemon server.js
```

### TODO
 - Write tests
 - Complete scoring
 - Add database functionality
 - Make domain, topic, subtopic and question creation dynamic
 - Add vagrantfile
 
### Future Functionality
 - Report Generation
   * Per-domain, topic and sub-topic scores
   * Compare organization's scores over time
   * Graphical view of strong/weak areas
 - Create "suggestions" for failing modules

### Contributing
Contributions to the project are incredibly welcome, and all feedback given is greatly appreciated! If you're an Incident Responder/Handler and you have suggestions to allow this to fit your environment, workflow, or organization - let us know!