# SquadJS Plugin for [Guardian Onlybans](https://guardianonlybans.com)

<div align="center">

[![GitHub Release](https://img.shields.io/github/release/IgnisAlienus/SquadJS-Guardian.svg?style=flat-square)](https://github.com/IgnisAlienus/SquadJS-Guardian/releases)
[![GitHub Contributors](https://img.shields.io/github/contributors/IgnisAlienus/SquadJS-Guardian.svg?style=flat-square)](https://github.com/IgnisAlienus/SquadJS-Guardian/graphs/contributors)
[![GitHub Release](https://img.shields.io/github/license/IgnisAlienus/SquadJS-Guardian.svg?style=flat-square)](https://github.com/IgnisAlienus/SquadJS-Guardian/blob/master/LICENSE)

<br>

[![GitHub Issues](https://img.shields.io/github/issues/IgnisAlienus/SquadJS-Guardian.svg?style=flat-square)](https://github.com/IgnisAlienus/SquadJS-Guardian/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/IgnisAlienus/SquadJS-Guardian.svg?style=flat-square)](https://github.com/IgnisAlienus/SquadJS-Guardian/pulls)
[![GitHub Stars](https://img.shields.io/github/stars/IgnisAlienus/SquadJS-Guardian.svg?style=flat-square)](https://github.com/IgnisAlienus/SquadJS-Guardian/stargazers)
[![Discord](https://img.shields.io/discord/1174357658971668551.svg?style=flat-square&logo=discord)](https://discord.gg/onlybans)

<br><br>

</div>

## What it do?

- This plugin will check if joining players are in Guardian Onlyban's BOLO Players list. BOLO Players are players that we suspect of Cheating but don't yet have enough evidence on them to Ban. If you get a BOLO Player in your Server, monitor them and gather evidence if they are indeed Cheating.

## Pre-requesites

- Latest Version of [SquadJS](https://github.com/Team-Silver-Sphere/SquadJS)

## How to install:

- Add `guardian.js` to your `./squad-server/plugins` folder.
- Add to your `config.json`
  - `channelID` is the Discord Channel ID that you want Embed Notifications to be posted to.
  - `color` is the color of the Embed.
  - `pingGroups` is a comma separated array of Roles to ping.
  - `pingHere` will enabled pinging @here to ping people that can see the Channel and are online.
  - `warnInGameAdmins` will send an Admin Warn to in game admins.

## Releases

Releases will be given a version number with the format `v{major}.{minor}.{patch}`, e.g. `v3.1.4`. Changes to `{major}`/`{minor}`/`{patch}` will imply the following:

- `{major}` - The release contains a new/updated feature that is (potentially) breaking, e.g. changes to event outputs that may cause custom plugins to break.
- `{minor}` - The release contains a new/updated feature.
- `{patch}` - The release contains a bug fix.
