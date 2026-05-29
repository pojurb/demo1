#!/usr/bin/env bash
# Convenience wrapper for Mac/Linux users
# Core logic lives in run.js — this just forwards arguments
SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
node "$SCRIPTS_DIR/run.js" "$@"
