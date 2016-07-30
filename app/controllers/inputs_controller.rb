class InputsController < ApplicationController
    $pieces = []
    def create
        @input = Input.new(input_params)
        respond_to do |format|
            @errorPiece = []
            if @input.save
                format.js {flash[:notice] = "Your piece is piece #{@input.piece}"}
                @resetForm = "1"
                $pieces.push(@input.piece)
            else
                format.js {flash[:notice] = "There was an error, please try again."}
                @input.errors.any?
                if (@input.errors["piece"] != nil)
                    @errorPiece.push(@input.errors["piece"][0])
                end
                @resetForm = "0"
            end
        end
    end

private
    def input_params
        params.require(:input).permit(:piece)
    end
end
