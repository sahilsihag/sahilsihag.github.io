#!/usr/bin/gnuplot
#
# Plot for packets blocked on different ports.
#
# NOT USED ON WEBSITE; ONLY FOR REFERENCE
#
# Make sure there is no packets-blocked-ports.png already
# otherwise this will append to that file, and you won't see any change.

reset

# pngcairo instead of only png; better quality, bigger file size
set terminal pngcairo size 1017,360

set logscale y
set xrange [-500:66000]
# using 2:1 to switch x-y axis from file data
# set yrange [1:*]

set xlabel "Port number"
set ylabel "Number of packets blocked"
unset key
set grid
set output 'packets-blocked-ports.png'
plot "dpt-sort-by-port.txt" using 2:1 with impulses
