const AcoustatsPage = () => {
    return (
        <div className="max-w-none prose prose-invert prose-a:text-pink-400">
            <h3>Prerequisites</h3>
            <p>
                To set up Acoustats, you must first create a Last.fm account. To
                create a Last.fm account, go to{" "}
                <a
                    href="https://www.last.fm/join"
                    target="_blank"
                    rel="nofollow noreferrer"
                >
                    this link
                </a>{" "}
                and follow the instructions.
            </p>
            <p>
                After you create your account, go to Last.fm&apos;s{" "}
                <a
                    href="https://www.last.fm/about/trackmymusic#spotify"
                    target="_blank"
                    rel="nofollow noreferrer"
                >
                    Track My Music page
                </a>{" "}
                , scroll down to the section for your platform and follow the
                instructions to configure your media platform of choice.
            </p>
            <p>
                As an example, for Spotify, scroll down to Spotify, and click
                &quot;Connect&quot;, then follow the instructions to link your
                Spotify account.
            </p>
            <p>
                After your media platform is linked, start listening to music.
                After you start listening, Acoustats (through Last.fm) will be
                able to access your listening history. At any time, if you want
                to check what listening history Last.fm and Acoustats can see,
                go to your Last.fm profile from either the{" "}
                <a
                    href="https://www.last.fm/home"
                    target="_blank"
                    rel="nofollow noreferrer"
                >
                    homepage
                </a>{" "}
                (hovering over your profile picture, then clicking &quot;View
                Profile&quot;) or by going to
                <code>https://www.last.fm/user/YOUR_LASTFM_USERNAME</code>.
            </p>

            <h3>Setting Up Acoustats</h3>
            <p>
                If you want to use a community version of Acoustats, join the{" "}
                <a
                    href="https://discord.gg/vSbKaB8wk3"
                    target="_blank"
                    rel="nofollow noreferrer"
                >
                    HK Development Discord server
                </a>{" "}
                and go to the <code>#music-analyzer-commands</code> channel. In
                that channel, first tell the bot what your Last.fm username is
                by using the <code>/set-lastfm-username</code> slash command,
                passing your username to the prompt.
            </p>
            <p>
                If you wish to self-host the analyzer and/or bot, follow the
                instructions in{" "}
                <a
                    href="https://github.com/hkamran80/music-analyzer"
                    target="_blank"
                    rel="nofollow noreferrer"
                >
                    the GitHub repository
                </a>
                .
            </p>

            <h3>Using Acoustats</h3>
            <p>
                To use Acoustats, all you have to do is go into a channel (or
                you can DM the bot) with a command. The following commands are
                available.
            </p>
            <ul>
                <li>
                    <code>/get-all-stats</code>: Get all your listening
                    statistics for a given time period
                </li>
                <li>
                    <code>/get-top-tracks</code>: Get your top tracks for a
                    given time period
                </li>
                <li>
                    <code>/get-top-artists</code>: Get your top artists for a
                    given time period
                </li>
                <li>
                    <code>/get-duration</code>: Get your listening duration for
                    a given time period
                </li>
                <li>
                    <code>/get-track-count</code>: Get the amount of tracks you
                    listened to in a given time period
                </li>
            </ul>

            <h4>Regarding Track Durations</h4>
            <p>
                Due to the way Last.fm provides track data, the duration that is
                listed may not be the exact duration. Attempts have been taken
                to circumvent those issues, but nevertheless, some tracks do not
                have durations.
            </p>

            <small>
                <p>
                    Acoustats is licensed under the{" "}
                    <a
                        href="https://snyk.io/learn/what-is-gpl-license-gplv3-explained/"
                        target="_blank"
                        rel="nofollow noreferrer"
                    >
                        GPLv3 license
                    </a>
                    .
                </p>
                <p>
                    Spotify Wrapped is a registered trademark of Spotify AB.
                    Last.fm is a registered trademark of Audioscrobbler Limited.
                    I am in no way affiliated with Spotify AB or Audioscrobbler
                    Limited.
                </p>
            </small>
        </div>
    );
};

export default AcoustatsPage;
