# Walkthrough recording

[demo.cast](demo.cast) is an asciicast v2 terminal recording made by executing
[the recording script](../scripts/record-demo.mjs). It runs the offline validator,
shows the synthetic manipulation input, and **replays a previously captured actual
Codex response**. It does not simulate a live model call or show real robot footage.

Play it with an asciicast-compatible player, for example:

```sh
asciinema play docs/demo.cast
```

To make a fresh recording without overwriting evidence:

```sh
node scripts/record-demo.mjs .runs/new-demo.cast
```

For a future public video, capture a clean installation, the same fixture, a live
agent session if available, and the results page. Keep provenance and limitations
visible. Do not expose credentials or private logs.

