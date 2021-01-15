# PocCleanArchiStateManagement

Project to compare both state management  `redux` & `apollo` .

### Contexte
https://kata-log.rocks/social-network-kata

## Backlog
- Posting: Alice can publish messages to a personal timeline
- Reading: Bob can view Alice’s timeline
- Following: Charlie can subscribe to Alice’s and Bob’s timelines, and view an aggregated list of all subscriptions
- Mentions: Bob can link to Charlie in a message using “@”
- Links: Alice can link to a clickable web resource in a message
- Direct Messages: Mallory can send a private message to Alice
    


# Resume

[Clean archi for Frontend](https://slides.com/johanpujol-1/clean-archi-front-state-management)



## REDUX

#### PROs
- Very Popular 
- Many resources
- Selectors ( for making view model more customizable )

#### CONs
- Complicate on first regard
- 


## Apollo local cache

### PROs
- Use GQL for query
- Auto property loading
- Easier to test


### CONs
- Need to setup cache for EACH query
- Very verbose
- Need to create many query for different view model
