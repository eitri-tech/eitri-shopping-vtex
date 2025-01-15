#!/bin/bash

# Função para aumentar a versão do Eitri App Shared
bumpEitriAppSharedVersion() {

    JS_FILE="./eitri-app.conf.js"


    # Extrai a versão atual
    CURRENT_VERSION=$(grep -o "'version': '[^']*'" "$JS_FILE" | cut -d "'" -f 4)

    # Incrementa o patch da versão
    IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
    PATCH=$((VERSION_PARTS[2] + 1))
    NEW_VERSION="${VERSION_PARTS[0]}.${VERSION_PARTS[1]}.$PATCH"


    # Substitui a versão no arquivo
    sed -i '' "s/'version': \'$CURRENT_VERSION\'/\'version\': \'$NEW_VERSION\'/" "$JS_FILE"

    echo "$NEW_VERSION"

}

# Função para aumentar a versão nos imports dos Eitri Apps
bumpEitriAppsImports() {

    sed -i '' "s/'eitri-luminus': '@eitri-shopping-demo-shared:[^']*'/'eitri-luminus': '@eitri-shopping-demo-shared:${newVersion}'/g" "./../$1/eitri-app.conf.js"

}

# Função para executar 'eitri push-version'
executePushVersion() {
    eitri push-version --shared
}

# Função principal
push() {

    echo "Fazendo o bump da versão do shared"

    newVersion=$(bumpEitriAppSharedVersion)

    echo "Publicando Eitri App"

    executePushVersion

    echo "Atualizando versão dos eitri apps"

    entriApps=("eitri-shopping-demo-account" "eitri-shopping-demo-cart" "eitri-shopping-demo-home" "eitri-shopping-demo-pdp" "eitri-shopping-demo-checkout")

    for element in "${entriApps[@]}"
    do
        bumpEitriAppsImports "$element" "$newVersion"
    done
}

# Chama a função principal
push
