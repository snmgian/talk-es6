require 'sinatra'
require 'sinatra/reloader' if development?
require 'slim'
require 'tilt'

index = [
  :cover,
  :origins,
  :es6,
  :classes,
  :inheritance,
  :'proxies',
  :arrow_functions,
  :'comprehensions',
  :'block-scoping',
  :'block-scoping-2',
  :'block-scoping-3',
  :modules,
  :'modules-object-literal-pattern',
  :'modules-module-pattern',
  :'modules-2',
  :'modules-3',
  :'promises',
  :'promises-states',
  :'promises-2',
  :'promises-3b',
  :'promises-4a',
  :'promises-callback-hell',
  :'promises-hell',
  :'generators',
  :'generators-2',
  :'generators-3',
  :'more',
  :'more-2',
  :'more-3',
  :'bonus-sync',
  :'bonus-promises',
  :'bonus-async',
  :'bonus-async-yielder',
  :'bonus-promises-hell',
  :'bonus-async-heaven',
  :end
]

def hl_code(language, &block)
  "<pre><code data-language='#{language}'>#{yield}</code></pre>"
end

get '/' do
  slim :master, :locals => {
    author: 'snmgian',
    topic: 'ecmascript',
    title: 'ECMAScript 6'
  }
end

get '/slides/:n' do |n|
  n = n.to_i

  if n >= 1 && n <= index.length
    slim index[n - 1], views: 'slides'
  else
    "<p>Page: #{n}</p>"
  end
end
