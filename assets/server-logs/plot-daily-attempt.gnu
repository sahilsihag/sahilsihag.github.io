#!/usr/bin/gnuplot
#
# Plot for daily brute-force attempts.
#
# NOT USED ON WEBSITE; ONLY FOR REFERENCE
#
# Make sure there is no daily-attempts.png already
# otherwise this will append to that file, and you won't see any change.

reset
# pngcairo instead of only png; better quality, bigger file size
set terminal pngcairo size 1017,360
set style fill solid 0.75 noborder
set boxwidth 0.8
set yrange [0:*]
set xrange [*:81]
set grid
set xlabel "Day number"
set ylabel "Number of SSH attempts"
unset key
set output 'daily-attempts.png'

plot "daily-count_with-day-num.txt" with boxes
