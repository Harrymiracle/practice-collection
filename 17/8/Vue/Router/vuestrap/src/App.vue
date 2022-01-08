<template>
  <div id="app">
    <div class='container'>
      <div class='row'>
        <div class='col-lg-4'>
          <h1>demo</h1>
        </div>

        <div class='col-lg-8'>
          <div class='panel panel-default' style='min-width:500px;box-shadow:4px 4px 10px #888888;'>
            <div class="panel-heading">
              <button id='btnCreate'>
                <span class="glyphicon glyphicon-plus"></span>
              </button>
              <span>&nbsp;&nbsp;&nbsp;</span>
            </div>
            <div class="panel-body">
              <div style='float: left;width:100%'>

                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                  Launch demo modal
                </button>

                <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                      </div>
                      <div class="modal-body">
                        ...
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <form class="form-horizontal">
          <div class="form-group form-group-lg">
            <label class="col-sm-2 control-label" for="formGroupInputLarge">Large label</label>
            <div class="col-sm-10">
              <input class="form-control" type="text" id="formGroupInputLarge" placeholder="Large input">
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="col-sm-2 control-label" for="formGroupInputSmall">Small label</label>
            <div class="col-sm-10">
              <input class="form-control" type="text" id="formGroupInputSmall" placeholder="Small input">
            </div>
          </div>
        </form>

        <div class="form-group has-success has-feedback">
          <label class="control-label" for="inputSuccess2">Input with success</label>
          <input type="text" class="form-control" id="inputSuccess2" aria-describedby="inputSuccess2Status">
          <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
          <span id="inputSuccess2Status" class="sr-only">(success)</span>
        </div>
        <div class="form-group has-warning has-feedback">
          <label class="control-label" for="inputWarning2">Input with warning</label>
          <input type="text" class="form-control" id="inputWarning2" aria-describedby="inputWarning2Status">
          <span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>
          <span id="inputWarning2Status" class="sr-only">(warning)</span>
        </div>
        <div class="form-group has-error has-feedback">
          <label class="control-label" for="inputError2">Input with error</label>
          <input type="text" class="form-control" id="inputError2" aria-describedby="inputError2Status">
          <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
          <span id="inputError2Status" class="sr-only">(error)</span>
        </div>
        <div class="form-group has-success has-feedback">
          <label class="control-label" for="inputGroupSuccess1">Input group with success</label>
          <div class="input-group">
            <span class="input-group-addon">@</span>
            <input type="text" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status">
          </div>
          <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
          <span id="inputGroupSuccess1Status" class="sr-only">(success)</span>
        </div>

        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default">1</button>
          <button type="button" class="btn btn-default">2</button>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="#">Dropdown link one</a></li>
              <li><a href="#">Dropdown link two</a></li>
            </ul>
          </div>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
export default {
//  name: 'app'  
}
</script>

<style>
#app {
  margin-top: 6px;
}
</style>