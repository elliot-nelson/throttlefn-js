# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Broken links in changelog
- Incorrect reference to node v4.x in readme

## [2.0.0] - 2018-08-19
### Added
- This changelog
- Support for node v8.0 and v10.0
- Support for specifying a custom promise library

### Changed
- Replace `istanbul` with `nyc` (for code coverage)

### Removed
- Dependency on the `bluebird` promise library
- Support for node v0.10, v0.12, v4.0

### Fixed
- Specs and other misc dev files are no longer included in the published package

[Unreleased]: https://github.com/elliot-nelson/throttlefn-js/compare/v2.0.0...HEAD
[2.0.0]:      https://github.com/elliot-nelson/throttlefn-js/compare/v1.2.0...v2.0.0
