import fetch from 'node-fetch'
import readlineSync from 'readline-sync';
import fsa from 'async-file'
import fs from 'fs'
import moment from 'moment'
import delay from 'delay'

const randstr = length => {
    var text = "";
    var possible =
        "1234567890";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

const randomshil = () => {
    const datanya = fs.readFileSync("./data/kata.txt", 'utf8')
    const array = datanya.toString().replace(/\r/g, "").split('\n')
    const result = array[Math.floor(Math.random() * array.length)]
    return result;
};

const getToken = (email, password) => new Promise((resolve, reject) => {
    fetch('https://discord.com/api/v9/auth/login', {
      method: 'POST',
      headers: {
        'Host': 'discord.com',
        'authorization': 'undefined',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        captcha_key: null,
        login: email,
        password: password,
        undelete: false,
        gift_code_sku_id: null,
    }),
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

const Channelmessage = (token, channelId, content) => new Promise((resolve, reject) => {
    fetch('https://discord.com/api/v9/channels/' + channelId + '/messages', {
      method: 'POST',
      headers: {
        'Host': 'discord.com',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.1; Custom) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Mobile Safari/537.36',
        'x-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImlkIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA4LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjE2NjUwNSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=',
        'authorization': `${token}`,
        'accept-Language': 'id',
        'content-Type': 'application/json',
        'accept': '/',
        'urigin': 'https://discord.com',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Cookie': '__dcfduid=d012bfe08dff11edb8fedb78bfa1f204; __sdcfduid=d012bfe18dff11edb8fedb78bfa1f204d13216078dc999b6863f9da6ccff0d54616c670f8c1eb54a8b59461cdee4ee48; __cfruid=2528a45cebd5df9ebfd833a7cb3d196da353b710-1673043944'
      },
      body: JSON.stringify({
        content: content,
        nonce: randstr(18),
        tts: false
    }),
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

const removeMessage = (token, channelId, messageId) => {
    fetch('https://discord.com/api/v9/channels/' + channelId + '/messages/' + messageId, {
      method: 'DELETE',
      headers: {
        'Host': 'discord.com',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.1; Custom) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Mobile Safari/537.36',
        'x-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImlkIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA4LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjE2NjUwNSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=',
        'authorization': `${token}`,
        'accept-Language': 'id',
        'content-Type': 'application/json',
        'accept': '/',
        'urigin': 'https://discord.com',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Cookie': '__dcfduid=d012bfe08dff11edb8fedb78bfa1f204; __sdcfduid=d012bfe18dff11edb8fedb78bfa1f204d13216078dc999b6863f9da6ccff0d54616c670f8c1eb54a8b59461cdee4ee48; __cfruid=2528a45cebd5df9ebfd833a7cb3d196da353b710-1673043944'
      }
    })
};

(async () => {
    try {
        console.log("\n")
        console.log("////////////////////////// ")
        console.log("// Badut Discord nodejs // ")
        console.log("////////////////////////// ")
        console.log("\n")
        console.log(`Silahkan pilih\n1. Generate token\n2. Run BOT Discord (Autochat + autodelete)\n3. Run BOT Discord (Autochat only)\n4. Exit`)
        const choise = readlineSync.question('Masukan Pilihanmu : ');
        if (choise === "1") {
            console.log("\n// Badut Discord nodejs (Generate token)")
            console.log("[Info] Generate token hanya bisa digunakan di IP lokal, karena mengharuskan login di browser dengan alamat IP yang sama terlebih dahulu untuk authentikasi!\nDan untuk pengguna vps kalian bisa generete terlebih dahulu menggunakan ip local, kemudian salin tokennya dan memasukkan kedalam file yang ada di /data/token.txt")
            const email = readlineSync.question('Email: ');
            const password = readlineSync.question('Password: ');
            const ambiltoken = await getToken(email, password)
            if (ambiltoken.token) {
                console.log(`Token kamu adalah : ${ambiltoken.token}`)
                await fsa.writeTextFile("./data/token.txt", ambiltoken.token, "utf-8");
                console.log(`Token berhasil di simpan di /data/token.txt`)
            } else if (ambiltoken.captcha_key.includes('captcha-required')) {
                console.log("Kamu harus login ke browser terlebih dahulu")
            } else {
                console.log("telah terjadi error")
            }
        } else if (choise === "2") {
            const data = fs.readFileSync('./data/token.txt', 'utf8');
            const token = data.toString();
            console.log("\n// Badut Discord nodejs (with autodelete chat)")
            console.log(`Masukan ID channel atau nama file.txt`)
            const channelId = readlineSync.question('Channel ID/file .txt : ');
            if (channelId.includes(".txt")) {
                if (!(await fsa.exists(channelId))) return console.warn(`Maaf!! File ${channelId} tidak ada`)
                const chnlID = await fsa.readTextFile(channelId, "utf-8")
                const channelnya = chnlID.toString().replace(/\r/g, "").split('\n')
                //console.log(channelnya)
                console.log(`Total : ${channelnya.length} Channel ID`)
                while (true){
                    for(let i = 0; i < channelnya.length; i++) {
                        const content = randomshil()
                        const sendMessage = await Channelmessage(token, channelnya[i], content)
                        //console.log(`mengirim ke channel ID ${channelnya[i]}`)
                        if (sendMessage.id) {
                            console.log(`[ ${moment().format("HH:mm:ss")} ] Sukses!! mengirim ke channel ID ${channelnya[i]} | Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content}`)
                            await fsa.writeTextFile("./data/msgid.txt", sendMessage.id, "utf-8")
                            const messageId = await fsa.readTextFile("./data/msgid.txt", "utf-8")
                            console.log(`[ ${moment().format("HH:mm:ss")} ] Delay 10s for delete messageID: ${messageId}`)
                            await delay(10000)
                            await removeMessage(token, channelnya[i], messageId)
                        } else {
                            continue
                        }
                    }
                }
            } else {
                while (true) {
                    const content = randomshil()
                    const sendMessage = await Channelmessage(token, channelId, content)
                    if (sendMessage.id) {
                        console.log(`[ ${moment().format("HH:mm:ss")} ] Sukses!! Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content}`)
                        await fsa.writeTextFile("./data/msgid.txt", sendMessage.id, "utf-8")
                        const messageId = await fsa.readTextFile("./data/msgid.txt", "utf-8")
                        console.log(`[ ${moment().format("HH:mm:ss")} ] delay 10s for delete messageID: ${messageId}`)
                        await delay(10000)
                        await removeMessage(token, channelId, messageId)
                    } else {
                        continue
                    }
                }
            }
        } else if (choise === "3") {
            const data = fs.readFileSync('./data/token.txt', 'utf8');
            const token = data.toString();
            console.log("\n// Badut Discord nodejs (autochat only)")
            console.log(`Masukan ID channel atau nama file.txt`)
            const channelId = readlineSync.question('Channel ID/file .txt : ');
            if (channelId.includes(".txt")) {
                if (!(await fsa.exists(channelId))) return console.warn(`Maaf!! File ${channelId} tidak ada`)
                const chnlID = await fsa.readTextFile(channelId, "utf-8")
                const channelnya = chnlID.toString().replace(/\r/g, "").split('\n')
                //console.log(channelnya)
                console.log(`Total : ${channelnya.length} Channel ID`)
                while (true){
                    for(let i = 0; i < channelnya.length; i++) {
                        const content = randomshil()
                        const sendMessage = await Channelmessage(token, channelnya[i], content)
                        //console.log(`mengirim ke channel ID ${channelnya[i]}`)
                        if (sendMessage.id) {
                            console.log(`[ ${moment().format("HH:mm:ss")} ] Sukses!! mengirim ke channel ID ${channelnya[i]} | Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content}`)
                        } else {
                            continue
                        }
                    }
                }
            } else {
                while (true) {
                    const content = randomshil()
                    const sendMessage = await Channelmessage(token, channelId, content)
                    if (sendMessage.id) {
                        console.log(`[ ${moment().format("HH:mm:ss")} ] Sukses!! Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content}`)
                    } else {
                        continue
                    }
                }
            }
        } else {
            process.exit();
        }
    } catch (err) {
        console.log(err)
    }
})();