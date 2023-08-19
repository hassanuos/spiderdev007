# Linux, Unix, and macOS very useful regardless of operating system
# Syntax

scp [option] [user_name@source_host:path/to/source/file] [user_name@target_host:target/path]

# Problem

  - permission denied where uploading the file
  - ssh key location incorrect
  - incorrect password for remote server


# Solution
- open git bash

# 1. Local System/Computer to remote server example

scp -i ~/.ssh/id_rsa /d/adminer.php root@10.5.10.15:/var/www/reporting/public


# 2. Further More example for sever to server file migrations

Server X
-----------
IP: 10.1.2.11
Username: spider1
Password: 123456

Server Y
-----------
IP: 10.2.10.2
Username: spider2
Password: spider@#

ServerX$> scp spider2@10.2.10.2:/home/work/iq/information.txt .

The . at end means the current working directory


#if y ou want to copy entire directory use -r after the scp

ServerX$>scp -r spider2@10.2.10.2:/home/opengenus/iq/ .




# Different parameters and its effectiveness

scp --P <port>

scp -p (Save the original files modification/access times, and modes)

scp -q (Turn off the progress meter)

scp -r (Copy recursively)

scp -rp (recursively and preserve the file attributes)

scp -S <program> (Specify the <program> to use for connecting)

scp -v (Display the operations execution step by step) enbles the debug level 2

scp -l <bandwidthlimit> (set bandwidth limit so even when slow iternet will not effect the copy of huge amount of data)

scp -c <cipher> (Specify the <cipher> for encrypting the data transfer) Default cypher (AES-128) example: 3des (Allowed values are 'aes128-ctr', 'aes128-cbc', 'aes192-ctr', 'aes192-cbc', 'aes256-ctr', 'aes256-cbc', 'blowfish-cbc', 'arcfour', 'arcfour128', 'arcfour256', 'cast128-cbc', and '3des-cbc'.)

scp -1 (Use SSH protocol 1)

scp -2 (Use SSH protocol 2)

scp -3 (To route the traffic through the machine on which the command is issued)

scp -4 (IPv4)

scp -6 (IPv6)

scp -B (Use batch mode)

scp -d source_file joe@myhost:~/demo/destination ( For example, the following command copies source_file to the directory called destination if this directory exists. If the directory doesnt exist, source_file is copied to the demo directory and given the file name destination.)

scp -C (Use compression)

scp -i <identity_file> (file name of the private SSH key file)


# Scenario-1: if both remote servers has ports

> scp -3 scp://user1@host1:"port1"/path/to/file scp://user2@host2:"port2"/path/to/file

# Scenario-2: if we would like copy only specific files at once

> scp user1@host1.com:/home/workingdir/{test.txt, test1.txt}  .

#Advanced options

scp -rpqC local_directory user@remote_server:/path/to/destination



Recomendataions if you would like to improve more:
https://www.microfocus.com/documentation/rsit-server-client-unix/8-4-0/unix-guide/scp_options_ap.html
https://phoenixnap.com/kb/linux-scp-command
