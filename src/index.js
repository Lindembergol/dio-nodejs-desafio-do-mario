const player01 = {
    NOME: 'Mario',
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

const player02= {
    NOME: 'Yoshi',
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = 'RETA'
            break;
        case random < 0.66:
            result = 'CURVA'
            break;
        default:
            result = 'CONFRONTO'
            break;
    }

    return result
}

async function logRollResult(charName, block, diceResult, attribute) {
    console.log(`${charName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function randomItems(){
    let random = Math.floor(Math.random() * 2) + 1
    let result

    switch (true) {
        case random > 1:
            result = 'CASCO'
            break;
    
        default:
            result = 'BOMBA'
            break;
    }

    return result
}

async function randomTurbo(){
    let random = Math.floor(Math.random() * 2) + 1
    let result

    switch (true) {
        case random > 1:
            result = 'TURBO'
            break;
    
        default:
            result = ''
            break;
    }

    return result
}

async function turboPlayer(char){
    let turbo = await randomTurbo()
    if (turbo === 'TURBO') {
        console.log(`⭐ - ${char.NOME} pegou um turbo, ganhou 1 ponto`)
        char.PONTOS++
    }
}

async function playRaceEngine(char1, char2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`)

        // Sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === 'RETA') {
            totalTestSkill1 = diceResult1 + char1.VELOCIDADE
            totalTestSkill2 = diceResult2 + char2.VELOCIDADE

            await logRollResult(player01.NOME, 'velocidade', diceResult1, player01.VELOCIDADE)
            await logRollResult(player02.NOME, 'velocidade', diceResult2, player02.VELOCIDADE)
        }

        if (block === 'CURVA'){
            totalTestSkill1 = diceResult1 + char1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + char2.MANOBRABILIDADE

            await logRollResult(player01.NOME, 'manobrabilidade', diceResult1, player01.MANOBRABILIDADE)
            await logRollResult(player02.NOME, 'manobrabilidade', diceResult2, player02.MANOBRABILIDADE)
        }
        
        if (block === 'CONFRONTO'){
            let powerResult1 = diceResult1 + char1.PODER
            let powerResult2 = diceResult2 + char2.PODER

            console.log(`${char1.NOME} confrontou com ${char2.NOME} 🥊`)
            await logRollResult(player01.NOME, 'poder', diceResult1, player01.PODER)
            await logRollResult(player02.NOME, 'poder', diceResult2, player02.PODER)

            if (powerResult1 > powerResult2 && char2.PONTOS > 0) {
                let item = await randomItems()

                if (item === 'CASCO') {
                    console.log(`${char1.NOME} venceu o confronto com um(a) ${item}! ${char2.NOME} perdeu 1 ponto 🐢`)
                    char2.PONTOS--
                    await turboPlayer(char1)
                } else if (item === 'BOMBA') {
                    console.log(`${char1.NOME} venceu o confronto com um(a) ${item}! ${char2.NOME} perdeu 2 ponto 💣`)
                    if(char2.PONTOS >= 2){
                        char2.PONTOS = char2.PONTOS - 2
                    }else{
                        char2.PONTOS--
                    }
                    await turboPlayer(char1)
                }
            }

            if (powerResult2 > powerResult1 && char1.PONTOS > 0) {
                let item = await randomItems()

                if (item === 'CASCO') {
                    console.log(`${char2.NOME} venceu o confronto com um(a) ${item}! ${char1.NOME} perdeu 1 ponto 🐢`)
                    char1.PONTOS--
                    await turboPlayer(char2)
                } else if (item === 'BOMBA') {
                    console.log(`${char2.NOME} venceu o confronto com um(a) ${item}! ${char1.NOME} perdeu 1 ponto 💣`)
                    if(char1.PONTOS >= 2){
                        char1.PONTOS = char1.PONTOS - 2
                    }else{
                        char1.PONTOS--
                    }
                    await turboPlayer(char2)
                }
            }

            //char2.PONTOS -= powerResult1 > powerResult2 && char2.PONTOS > 0 ? 1 : 0
            
            console.log(powerResult1 === powerResult2 ? 'Confronto empatado! Nenhum ponto foi perdido' : '')
        }

        // verificando o vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${char1.NOME} marcou um ponto!`)
            char1.PONTOS++
        } else if(totalTestSkill2 > totalTestSkill1) {
            console.log(`${char2.NOME} marcou um ponto!`)
            char2.PONTOS++
        }

        console.log('__________________________________________')
    }
}

async function declareWinner(char1, char2) {
    console.log('Resultado final:')
    console.log(`${char1.NOME}: ${char1.PONTOS} ponto(s)`)
    console.log(`${char2.NOME}: ${char2.PONTOS} ponto(s)`)

    if (char1.PONTOS > char2.PONTOS)
        console.log(`\n${char1.NOME} venceu a corrida! Parabens! 🏆`)
    else if(char2.PONTOS > char1.PONTOS)
        console.log(`\n${char2.NOME} venceu a corrida! Parabens! 🏆`)
    else console.log('A corrida terminou em empate!')
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player01.NOME} e ${player02.NOME} começando... \n`
    )

    await playRaceEngine(player01, player02)
    await declareWinner(player01, player02)
})()