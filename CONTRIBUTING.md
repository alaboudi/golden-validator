# Issue Submissions
If you would like to submit a question, raise a bug or suggest an enhancement,
you should start by creating an issue on the repository's issue page. From there,
a discussion will take place on the validity of the issue and whether or not
it should be worked on.

Before raising an issue, please do search through previously raised issues
to see if it has already been addressed.

# Development
If an issue has been planned for development and you would like to contribute
to this repository, start by creating your own fork.

## Setup
To setup your environment you can run either `yarn install` or npm `install`
This will install all libraries run time and dev dependencies.

## Testing
This library will not accept any PR that does not have a test corresponding
to the feature changes/additions. Ensure that you place the correct tests and
that the build is not broken. You can check this by running `yarn test` or
`npm test`

## Scaffolds
If you are adding in a validator function that has been accepted, then you
can take advantage of our Plop scaffolds. You can run `yarn plop` in your
terminal and you will get a interactive scaffold generator.

## Commit Messages
All commits to be contributed to this repository should abide to our standards.
Use Gitmojis (follow  standards at https://gitmoji.carloscuesta.me/)
to make it easier for us to go through our commit history.
Also, we try to associate commits to raised issues. Please use the following
commit message syntax: `EMOJI MESSAGE (#ISSUE_NUMBER)`. For example
`:sparkles: Added new isGreaterThanValidator (#123)`

