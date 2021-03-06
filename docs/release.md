## Release process

This documents the process for issuing and deploying a new
release for CALC.

It assumes you want to create release `0.0.4`.

If this isn't the case, simply replace this value for your own. Or
alternatively, run `docker-compose run app python manage.py releasehelp` to generate a
customized version of these instructions just for you.

**Note:** When following these instructions, ensure that no one else is
merging any PRs into `develop`; at the time of this writing, cloud.gov will
run out of memory quota if multiple branches of CALC are deployed
simultaneously!

To release version 0.0.4 of CALC:

1.  Verify that the ["Unreleased" section of `CHANGELOG.md`][unreleased]
    is up-to-date by comparing it against GitHub's commit list (you can
    see that by clicking on the "Unreleased" section heading), and then
    describe the changes in a human-meaningful form (see previous release
    entries for the appropriate level of human-friendliness).

    Feel free to move more important, less technical entries to the top
    of the list. Remember, it will be read by both developers *and* users,
    so avoid the use of jargon where possible.

2.  Create a branch off `develop` called `v0.0.4-rc` and push it to
    GitHub:

    ```sh
    git checkout -b v0.0.4-rc develop
    git push -u https://github.com/18F/calc.git v0.0.4-rc
    ```

3.  [Issue a PR][pr] to merge your branch into `master` titled
    "Tag and release v0.0.4 to production". Paste in the latest changes from the
    topmost "Unreleased" section of `CHANGELOG.md` into the
    description of the PR so stakeholders know what's changed. If you're
    on OS X, you can easily copy this to your clipboard with the following
    command:

    ```sh
    docker-compose run app python manage.py unreleased_changelog | pbcopy
    ```

4.  Make sure that all automated QA services (CircleCI, etc) think
    the PR looks good.

5.  Wait for the stakeholders to sign-off on the release if there are
    functional or product changes.

6.  Update the version number in `calc/version.py` to `0.0.4` and then
    run:

    ```sh
    docker-compose run app python manage.py bump_changelog
    ```

    This will create a new entry for the new version in `CHANGELOG.md`,
    and it will also output your new version's release notes to
    `tag-message-v0.0.4.txt`.

7.  Commit the changes to git, tag the release, and push everything:

    ```sh
    git commit -a -m "Release v0.0.4."
    git tag -a v0.0.4 -F tag-message-v0.0.4.txt
    git push
    ```

8.  Merge the PR into `master` via the **Create a merge commit** merge
    strategy (i.e., do *not* squash or rebase). Once [CircleCI][] is finished,
    the site will be deployed to [production][production].

9.  Visit the [production instance][production] and make sure all is functioning as
    expected.

10. Merge `v0.0.4-rc` back into `develop` on the remote repository:

    ```sh
    git checkout develop
    git pull https://github.com/18F/calc.git develop
    git merge v0.0.4-rc
    git push https://github.com/18F/calc.git develop
    ```

Hooray, you're done!

[unreleased]: https://github.com/18F/calc/blob/develop/CHANGELOG.md#unreleased
[pr]: https://github.com/18F/calc/compare/staging...v0.0.4-rc
[pr2]: https://github.com/18F/calc/compare/master...staging
[production]: https://calc.gsa.gov
[CircleCI]: https://circleci.com/gh/18F/calc
