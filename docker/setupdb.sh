#!/bin/sh

createuser on_running -s

createdb on_running_development -U on_running
createdb on_running_test -U on_running
