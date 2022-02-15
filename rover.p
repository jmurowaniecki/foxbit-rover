#!tradutor
#
# Autor: João Paulo M. Sant`Anna <john@compilou.com.br>
#
# NASA Rover - Teste FoxBit.
#

declare -A TERRENO=()
declare -A POSICOES=([0]='^' [1]='>' [2]='V' [3]='<')
declare -A POSICAO=([0]=5 [1]=6)
declare    ROVER=2

# Função INICIO serve para iniciar o ambiente.
BORA_INICIO() {

    LIMPA TELA

    ESCREVE "Iniciando terreno…"

    LINHA=0
    for n in $(seq 10)
    do TERRENO[$n]='·                                          ·'
    done
}


BORA_ROVER() {
    TERRENO[$POSICAO[0]][$POSICAO[1]]="${POSICOES[$ROVER]}"

    echo '············································'
    for line in "${TERRENO[@]}"
    do echo "${line}"
    done
    echo '············································'
    echo 'D, E e M para Direita, Esquerda e Move'

    PERGUNTA MOVIMENTO

    # SE $MOVIMENTO FOR "D" ENTAO

    BORA_ROVER
    ESPERA 1
}

BORA_INICIO

BORA_ROVER