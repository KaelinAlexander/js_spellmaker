class DeitiesController < ApplicationController

    def index
        render json: Deity.all
    end

end