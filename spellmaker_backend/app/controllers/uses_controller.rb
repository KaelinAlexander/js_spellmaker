class UsesController < ApplicationController

    def index
        render json: Use.all
    end

end