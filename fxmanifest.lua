fx_version 'cerulean' -- https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/#fxv2-versions
game 'gta5'

author 'Tom Depasse'
version '1.0.0'

client_scripts {
    'client/*.lua'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/css/style.css.map',
    'html/css/*.css',
    'html/js/*.js',
    'html/fonts/Poppins/Poppins-*.ttf'
}
