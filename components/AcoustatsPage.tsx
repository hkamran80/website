const commands = [
    {
        command: "/get-all-stats",
        description:
            "Get all your listening statistics for a given time period",
    },
    {
        command: "/get-top-tracks",
        description: "Get your top tracks for a given time period",
    },
    {
        command: "/get-top-artists",
        description: "Get your top artists for a given time period",
    },
    {
        command: "/get-duration",
        description: "Get your listening duration for a given time period",
    },
    {
        command: "/get-track-count",
        description:
            "Get the amount of tracks you listened to in a given time period",
    },
];

const AcoustatsPage = () => {
    return (
        <div className="max-w-none prose prose-invert prose-a:text-pink-400">
            <h2>Prerequisites</h2>
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
                Profile&quot;) or by going to{" "}
                <code>https://www.last.fm/user/YOUR_LASTFM_USERNAME</code>.
            </p>

            <h2>Discord Bot</h2>
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

            <table>
                <thead>
                    <tr>
                        <th style={{ fontWeight: 900 }}>Command</th>
                        <th style={{ fontWeight: 900 }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {commands.map(({ command, description }, index) => (
                        <tr key={index}>
                            <td>
                                <code>{command}</code>
                            </td>
                            <td>{description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Digest</h2>
            <p>
                You can also subscribe to daily, weekly, and monthly digests of
                Acoustats reports with{" "}
                <a
                    href="https://acoustats.unisontech.org"
                    target="_blank"
                    rel="nofollow noreferrer"
                >
                    Acoustats Digest, a UNISON Technologies service
                </a>
                .
            </p>

            <h2>Track Durations</h2>
            <p>
                Due to the way Last.fm provides track data to Acoustats, the
                duration that is listed may not be the full total duration.
            </p>

            <p className="text-xs">
                Acoustats is licensed under the{" "}
                <a
                    href="https://choosealicense.com/licenses/agpl-3.0/"
                    target="_blank"
                    rel="nofollow noreferrer"
                >
                    AGPLv3 license
                </a>
                .
            </p>
            <p className="text-xs">
                Discord is a registered trademark of Discord Inc. Last.fm is a
                registered trademark of Audioscrobbler Limited. Spotify Wrapped
                is a registered trademark of Spotify AB. I am in no way
                affiliated with Spotify AB or Audioscrobbler Limited.
            </p>
        </div>
    );
};

export default AcoustatsPage;
